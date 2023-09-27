export const usePublisher = (
    namespace? : string
    /* eslint-disable  @typescript-eslint/no-explicit-any */
) : (detail : any) => void => 
{ /* eslint-disable  @typescript-eslint/no-explicit-any */
    const publisher = (detail : any) =>
    {
        window.dispatchEvent(
            new CustomEvent(
                `event_${namespace}`,
                {
                    detail
                }
            )
        );
    };

    return publisher;
};