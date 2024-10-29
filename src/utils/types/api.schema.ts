export type APILoaderInformation = {
  loading: boolean;
  success?: string;
  error: string;
};
export type renderProbs = (
  control: any,
  getValues: any,
  errors: any,
  register: any,
  setValue?: any,
  trigger?: any,
) => JSX.Element;
