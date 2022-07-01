import reportError from "utils/reportError";

export const makeApiCall = async ({ url, method = "GET", body }) => {
  try {
    const params = {
      method,
    };

    if (body) {
      params.body = body;
    }

    const response = await window.fetch(url, params);
    return await response.json();
  } catch (e) {
    // TODO: May need to better test the error handling + better messaging?
    reportError({
      message: "Something went wrong!",
      description: e.toString(),
    });
    return [];
  }
};
