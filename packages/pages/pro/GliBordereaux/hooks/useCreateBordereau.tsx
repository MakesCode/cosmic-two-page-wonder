import { createBordereauMutationOption } from "@features/pro/gli/Bordereaux/createBordereau/createBordereauMutationOption";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "@tanstack/react-router";
import { useToast } from "@hooks/use-toast";

export const useCreateBordereau = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { toast } = useToast();

  const mutation = useMutation({
    ...createBordereauMutationOption(dispatch),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["bordereaux"] });
      toast({
        title: "Bordereau créé",
        description: `Le bordereau ${data.reference} a été créé avec succès`,
      });
      navigate({ to: "/pro/bordereaux/$bordereauId", params: { bordereauId: data.id } });
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: error.message || "Une erreur est survenue lors de la création du bordereau",
        variant: "destructive",
      });
    },
  });

  return {
    createBordereau: mutation.mutate,
    isCreating: mutation.isPending,
  };
};
