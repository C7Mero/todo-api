export const serviceErrorResponse = (error:string) => {
  throw new Error(error);
}