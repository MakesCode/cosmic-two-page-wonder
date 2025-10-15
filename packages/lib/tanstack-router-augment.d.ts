declare module "@tanstack/router-core" {
  interface NavigateOptionProps {
    /**
     * Optional window target when navigating to an external resource.
     * Matches the standard anchor `target` attribute values.
     */
    target?: "_self" | "_blank" | "_parent" | "_top";
  }
}
