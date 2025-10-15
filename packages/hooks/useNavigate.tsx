import * as React from "react";
import {
  useNavigate as useRouterNavigate,
  type AnyRouter,
  type ToPathOption,
  type NavigateOptions,
  type RegisteredRouter,
  type UseNavigateResult,
} from "@tanstack/react-router";

type ExternalUrl = `${"http" | "https"}://${string}`;

const isExternalUrl = (value: unknown): value is ExternalUrl =>
  typeof value === "string" && /^https?:\/\//.test(value);

const resolveExternalUrl = (options: Pick<NavigateOptions, "to" | "href">): ExternalUrl | null => {
  if (options.href && isExternalUrl(options.href)) {
    return options.href;
  }

  if (typeof options.to === "string" && isExternalUrl(options.to)) {
    return options.to;
  }

  return null;
};

export function useNavigate<
  TRouter extends AnyRouter = RegisteredRouter,
  TDefaultFrom extends string = string,
>(_defaultOpts?: { from?: ToPathOption<TRouter, TDefaultFrom> }) {
  const baseNavigate = useRouterNavigate<TRouter, TDefaultFrom>(_defaultOpts);
  type NavigateOptionsWithTarget = NavigateOptions & {
    target?: React.HTMLAttributeAnchorTarget;
  };

  return React.useCallback<UseNavigateResult<TDefaultFrom>>(
    async (options) => {
      const optionsWithTarget = options as NavigateOptionsWithTarget;
      const externalUrl = resolveExternalUrl(optionsWithTarget);

      if (externalUrl && typeof window !== "undefined") {
        if (optionsWithTarget.target === "_blank") {
          const openedWindow = window.open(externalUrl, "_blank");
          if (openedWindow) {
            try {
              openedWindow.opener = null;
            } catch {
              // Ignore cross-origin restrictions when clearing opener
            }
            return;
          }

          window.location.assign(externalUrl);
          return;
        }

        if (optionsWithTarget.replace) {
          window.location.replace(externalUrl);
        } else {
          window.location.assign(externalUrl);
        }

        return;
      }

      const { target: _target, ...rest } = optionsWithTarget;
      await baseNavigate(rest as typeof options);
    },
    [baseNavigate],
  );
}
