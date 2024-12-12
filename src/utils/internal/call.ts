declare const PACKAGE_VERSION: string | undefined;

/**
 * Fetch an HTTP resource. This is publicly exposed in the
 * event you would like to access an endpoint that this
 * library does not currently support.
 *
 * UNLESS YOU'RE SURE OF WHAT YOU'RE DOING, YOU PROBABLY
 * SHOULDN'T USE THIS FUNCTION.
 */
export const call = async <
  T extends readonly any[] | Record<string, any>
>(config: {
  url: string;
}) => {
  const { url } = config;

  const headers = new Headers({
    "User-Agent": `RetroAchievements-api-js/${PACKAGE_VERSION ?? "Unknown"}`,
  });

  const rawResponse = await fetch(url, (typeof window !== undefined) ? {} : { headers });

  if (!rawResponse.ok) {
    throw new Error(
      `HTTP Error: Status ${rawResponse.status} ${rawResponse.statusText}`
    );
  }

  return (await rawResponse.json()) as T;
};
