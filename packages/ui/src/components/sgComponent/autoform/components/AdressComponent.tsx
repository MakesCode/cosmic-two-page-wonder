import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, MapPin, Globe, Check } from "lucide-react";
import { Button } from "@ui/components/ui/button";
import { cn } from "@utils/cn";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Loader } from "@googlemaps/js-api-loader";
import { AutoFormFieldProps } from "@ui/components/sgComponent/autoform/react";
import { LabelWrapper } from "@ui/components/sgComponent/autoform/components/FieldWrapper";
import { ToggleGroup, ToggleGroupItem } from "@ui/components/ui/toggle-group";
import { Input } from "@ui/components/ui/input";
import { Separator } from "@ui/components/ui/separator";

const getGoogleMapsConfig = () => {
  const isDevelopment = process.env.NODE_ENV === "development";

  return {
    apiKey: isDevelopment
      ? "AIzaSyBvXKA17WI3Tzj87i8l3xU9YgTQUXY5M2M" // Clé dev
      : "AIzaSyCzTJnXyjvQrWZax4Z7SvlNaApTzcYYYKc", // Clé prod
    version: isDevelopment ? "weekly" : "quarterly",
    libraries: ["places" as const],
    region: "FR",
    language: "fr",
  };
};

const loader = new Loader(getGoogleMapsConfig());

export interface AddressInformation {
  country?: string;
  codeCommuneINSEE?: string;
  address?: string;
  fullAddress?: string;
  zipCode?: string;
  city?: string;
  additionalAddress?: string;
  isManual?: boolean;
}

export const getGooglePlaceDetails = async (
  placeId: string,
): Promise<AddressInformation | null> => {
  try {
    const { Place } = await loader.importLibrary("places");

    const place = new Place({
      id: placeId,
      requestedLanguage: "fr",
    });

    await place.fetchFields({
      fields: ["addressComponents", "formattedAddress", "location"],
    });

    const addressComponents = parseAddressComponentsNew(place);

    return addressComponents;
  } catch (error) {
    console.error("Erreur détails du lieu:", error);
    return null;
  }
};
const parseAddressComponentsNew = (place: google.maps.places.Place): AddressInformation => {
  const components: AddressInformation = {
    fullAddress: place.formattedAddress || "",
    zipCode: "",
    city: "",
    address: "",
    country: "",
  };

  let streetNumber = "";
  let route = "";

  place.addressComponents?.forEach((component) => {
    const types = component.types;

    if (types.includes("street_number")) {
      streetNumber = component.longText || "";
    }

    if (types.includes("route")) {
      route = component.longText || "";
    }

    if (types.includes("postal_code")) {
      components.zipCode = component.longText || "";
    }

    if (types.includes("locality") || types.includes("postal_town")) {
      components.city = component.longText || "";
    }

    if (!components.city && types.includes("administrative_area_level_2")) {
      components.city = component.longText || "";
    }

    if (types.includes("country")) {
      components.country = component.longText || "";
    }
  });

  if (streetNumber && route) {
    components.address = `${streetNumber} ${route}`;
  } else if (route) {
    components.address = route;
  }

  return components;
};
const getGoogleAddressSuggestions = async (input: string): Promise<any> => {
  try {
    const { AutocompleteService } = await loader.importLibrary("places");
    const autocompleteService = new AutocompleteService();
    const response = await autocompleteService.getPlacePredictions({
      input,
      types: ["address"],
    });

    return response.predictions;
  } catch (error) {
    console.error("Erreur suggestions:", error);
    return [];
  }
};

export const getGouvPlacePredictions = async (input: string): Promise<AddressInformation[]> => {
  if (input.length <= 3) return [];

  const url = `https://api-adresse.data.gouv.fr/search/?q=${input}&limit=5&autocomplete=true`;

  const response = await fetch(url);
  const data = await response.json();

  return data.features.map((feature: any) => ({
    fullAddress: feature.properties.label,
    zipCode: feature.properties.postcode,
    city: feature.properties.city,
    address: feature.properties.name,
    description: feature.properties.label,
    country: "France",
    placeId: feature.properties.id,
  }));
};

const getAddressSuggestions = async (
  input: string,
  scope: "france" | "international",
): Promise<any> => {
  if (scope === "france") {
    return getGouvPlacePredictions(input);
  } else {
    return getGoogleAddressSuggestions(input);
  }
};

function useDebounce(value: string, delay: number = 500): string {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

function AddressSuggestion({ suggestion, index, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      className={`p-4 cursor-pointer transition-colors hover:bg-accent/50`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <MapPin className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="font-medium text-foreground">{suggestion.address}</p>
            <p className="text-sm text-muted-foreground">
              {suggestion.postal} {suggestion.city}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export const AdressComponent: React.FC<AutoFormFieldProps> = (props) => {
  const [query, setQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [viewMode, setViewMode] = useState<"search" | "manual">(
    props.value?.isManual ? "manual" : "search",
  );
  const [isAddressSelected, setIsAddressSelected] = useState(false);
  const debouncedQuery = useDebounce(query, 700);
  const [searchScope, setSearchScope] = useState<"france" | "international">(
    props?.field?.fieldConfig?.customData?.searchScope ?? "france",
  );

  const { data: apiSuggestions, isFetching } = useQuery({
    queryKey: ["addressSuggestions", debouncedQuery, searchScope],
    queryFn: () => getAddressSuggestions(debouncedQuery, searchScope),
    enabled: debouncedQuery.length > 0 && !isAddressSelected,
    gcTime: 0,
  });
  const { mutateAsync: mutateGooglePlace } = useMutation({
    mutationFn: getGooglePlaceDetails,
  });

  const filteredSuggestions = useMemo(() => {
    if (!apiSuggestions) return [];

    if (searchScope === "france") {
      return apiSuggestions;
    } else {
      return apiSuggestions.map((pred) => {
        const mainText = pred.structured_formatting?.main_text || "";
        const secondaryText = pred.structured_formatting?.secondary_text || "";

        const cityParts = secondaryText.split(/\s+/);
        const postalMatch = cityParts.find((part) => /^\d{5}$/.test(part));

        const postal = postalMatch || "";
        const city = cityParts
          .filter((part) => part !== postalMatch)
          .join(" ")
          .trim();

        return {
          address: mainText.trim(),
          city: city || secondaryText.trim(),
          postal: postal.trim(),
          placeId: pred.place_id,
        };
      });
    }
  }, [apiSuggestions, searchScope]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTyping(false);
      if (query?.length > 0 && !isAddressSelected) {
        setShowSuggestions(true);
      }
    }, 700);

    return () => clearTimeout(timer);
  }, [query]);

  const handleInputChange = (value) => {
    setQuery(value);
    setIsTyping(true);
    setIsAddressSelected(false);
  };

  const handleSuggestionSelect = async (index: number) => {
    const selected = filteredSuggestions[index];

    let addressData: AddressInformation;

    if (searchScope === "france") {
      addressData = {
        country: selected.country,
        fullAddress: selected.fullAddress,
        address: selected.address,
        city: selected.city,
        zipCode: selected.zipCode,
        isManual: false,
      };
    } else {
      const data = await mutateGooglePlace(selected.placeId);
      if (!data) return;
      addressData = {
        country: data.country,
        fullAddress: data.fullAddress,
        address: data.address,
        city: data.city,
        zipCode: data.zipCode,
        isManual: false,
      };
    }

    const syntheticEvent = {
      target: {
        value: addressData,
        name: props.field.key,
      },
    };

    props.inputProps.onChange(syntheticEvent);
    setIsAddressSelected(true);
    setQuery(addressData.fullAddress ?? "");
    setShowSuggestions(false);
    setIsTyping(false);
  };
  useEffect(() => {
    if (props.value?.fullAddress && !query) {
      setQuery(props.value.fullAddress);
      setIsAddressSelected(true);
    }
  }, [props.value?.fullAddress]);
  const handleClearSearch = () => {
    const syntheticEvent = {
      target: {
        value: {},
        name: props.field.key,
      },
    };
    props.inputProps.onChange(syntheticEvent);
    setQuery("");
    setIsTyping(false);
    setIsAddressSelected(false);
    setShowSuggestions(true);
  };
  const handleInputBlur = () => {
    setShowSuggestions(false);
    const hasValidSelection =
      props.value?.country &&
      props.value?.fullAddress &&
      props.value?.address &&
      props.value?.city &&
      props.value?.zipCode &&
      props.value?.isManual === false;

    if (hasValidSelection && query !== props.value?.fullAddress) {
      setQuery(props.value?.fullAddress || "");
      setIsAddressSelected(true);
    }
  };

  const isSelected =
    props.value?.country &&
    props.value?.fullAddress &&
    props.value?.address &&
    props.value?.city &&
    props.value?.zipCode &&
    props.value?.isManual === false &&
    query === props.value?.fullAddress;

  return (
    <div className="">
      <div className="w-full max-w-2xl">
        {viewMode === "search" ? (
          <div className="space-y-1">
            {props?.field?.fieldConfig?.customData?.showActionSelectedScopeSearch && (
              <ToggleGroup
                type="single"
                value={searchScope}
                onValueChange={(value: "france" | "international") => {
                  if (value) {
                    setSearchScope(value);
                    setIsAddressSelected(false);
                    setShowSuggestions(false);
                  }
                }}
                defaultValue="france"
                className="grid grid-cols-2 w-fit border-2"
                aria-label="Sélectionner le scope de recherche"
              >
                <ToggleGroupItem
                  value="france"
                  aria-label="Recherche en France"
                  className="cursor-pointer"
                >
                  <MapPin className="mr-2 h-4 w-4" /> France
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="international"
                  aria-label="Recherche Internationale"
                  className="cursor-pointer"
                >
                  <Globe className="mr-2 h-4 w-4" /> International
                </ToggleGroupItem>
              </ToggleGroup>
            )}
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />

                <Input
                  value={query}
                  onChange={(e) => handleInputChange(e.target.value)}
                  onFocus={() => {
                    setShowSuggestions(true);
                  }}
                  onBlur={handleInputBlur}
                  placeholder={
                    searchScope === "france"
                      ? "Commencez à taper votre adresse en France..."
                      : "Commencez à taper votre adresse..."
                  }
                  className={cn("pl-10 pr-6", isSelected ? "border-primary " : "")}
                />
                {isSelected && (
                  <div className="absolute right-1 top-1/2 transform -translate-y-1/2 right-10 flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                )}
                <AnimatePresence>
                  {query?.length > 0 && !isTyping && !isFetching && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={handleClearSearch}
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {(isTyping || isFetching) && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="absolute right-1 top-1/2 transform -translate-y-1/2"
                    >
                      <TypingIndicator />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <AnimatePresence>
                {showSuggestions && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border border-border rounded-md bg-background"
                  >
                    {filteredSuggestions?.map((suggestion, index) => (
                      <AddressSuggestion
                        key={index}
                        suggestion={suggestion}
                        index={index}
                        onClick={() => handleSuggestionSelect(index)}
                      />
                    ))}
                    <Separator />
                    <div className="p-4">
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => {
                          setQuery("");
                          setViewMode("manual");
                          const syntheticEvent = {
                            target: {
                              value: {
                                isManual: true,
                              },
                              name: props.field.key,
                            },
                          };
                          props.inputProps.onChange(syntheticEvent);
                        }}
                      >
                        Aucune de ces adresses ? Saisir manuellement
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        ) : (
          <ManualAddressForm
            onBackToSearch={() => {
              setViewMode("search");
              setQuery("");
            }}
            onChange={props.inputProps.onChange}
            value={props.value}
            keyfield={props.field.key}
          />
        )}
      </div>
    </div>
  );
};
export const ManualAddressForm = ({ onBackToSearch, onChange, value, keyfield }) => {
  const handleChange = (e) => {
    const syntheticEvent = {
      target: {
        value: {
          ...value,
          [e.target.name]: e.target.value,
        },
        name: keyfield,
      },
    };
    onChange(syntheticEvent);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full space-y-6 pl-4"
    >
      <div className="space-y-4">
        <div>
          <LabelWrapper required id="street-address" label="Numéro et Rue" />
          <Input
            id="street-address"
            name="address"
            value={value?.address}
            onChange={handleChange}
          />
        </div>
        <div>
          <LabelWrapper required id="postal-code" label="Code Postal" />
          <Input id="postal-code" name="zipCode" value={value?.zipCode} onChange={handleChange} />
        </div>
        <div>
          <LabelWrapper required id="city" label="Ville" />
          <Input id="city" name="city" value={value?.city} onChange={handleChange} />
        </div>
        <div>
          <LabelWrapper required id="country" label="Pays" />
          <Input id="country" name="country" value={value?.country} onChange={handleChange} />
        </div>
      </div>

      <Button
        variant="link"
        onClick={() => {
          const syntheticEvent = {
            target: {
              value: {
                isManual: false,
              },
              name: keyfield,
            },
          };
          onChange(syntheticEvent);
          onBackToSearch();
        }}
        className="p-0 h-auto"
        type="button"
      >
        Renseigner une adresse connue
      </Button>
    </motion.div>
  );
};
export const TypingIndicator = () => {
  return (
    <div className="flex space-x-1">
      <motion.div
        className="w-2 h-2 bg-primary rounded-full"
        animate={{ scale: [1, 1.5, 1] }}
        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
      />
      <motion.div
        className="w-2 h-2 bg-primary rounded-full"
        animate={{ scale: [1, 1.5, 1] }}
        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
      />
      <motion.div
        className="w-2 h-2 bg-primary rounded-full"
        animate={{ scale: [1, 1.5, 1] }}
        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
      />
    </div>
  );
};
