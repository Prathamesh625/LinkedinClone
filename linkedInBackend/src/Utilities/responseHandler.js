export const responseHandler = (data, status, statusCode) => {
  console.log(data);
  return { data: data, status: status, statusCode: statusCode };
};
