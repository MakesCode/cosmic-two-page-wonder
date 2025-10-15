export type FileRouteShape = {
  id: string;
  to: string;
  fullPaths: string;
};

export type RouteIdPaths<TRouteTypes extends FileRouteShape> = Extract<
  TRouteTypes["id"],
  `/${string}`
>;

export type GeneratedRoute<TRouteTypes extends FileRouteShape> = TRouteTypes["to"];
// | TRouteTypes["fullPaths"]
// | RouteIdPaths<TRouteTypes>;

type ExternalUrl = `${"http" | "https"}://${string}`;
type InternalRoute<TRouteTypes extends FileRouteShape> = Extract<
  GeneratedRoute<TRouteTypes>,
  `/${string}`
>;

export type AppRoutePath<TRouteTypes extends FileRouteShape> = InternalRoute<TRouteTypes> | ExternalUrl;

export type AppRoutesMap<TRouteTypes extends FileRouteShape, TRouteName extends string> = Partial<
  Record<TRouteName, AppRoutePath<TRouteTypes>>
>;

export interface Dependencies<TRouteTypes extends FileRouteShape, TRouteName extends string> {
  routes: AppRoutesMap<TRouteTypes, TRouteName>;
}
export type AppRouteName =
  | "PRO_HOME"
  | "ADMIN_HOME"
  | "HOUSING_HOME"
  | "GLI"
  | "SINISTER_ID"
  | "SINISTER"
  | "BORDEREAUX_NEW"
  | "BORDEREAUX_ID"
  | "BORDEREAUX";
