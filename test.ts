import axios from "axios";

const AUTH_ENDPOINT = "http://localhost:6900/user";
(async () => {
  try {
    const response = await axios.get(AUTH_ENDPOINT, {
      headers: {
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcl9pZCI6MSwibmFtZSI6IkFwb2xseW9uIEdyaW1mbGFyZSIsInRva2VuIjoiQjRia0ZuR2V1cjM0YXp0NlhvQXNxNlJTSWI5RzN3TXAiLCJwcm92aWRlciI6Imx1bmFyaWF1dGgiLCJwcm92aWRlcl9pZCI6IjEiLCJpYXQiOjE3MjQwMzI0MzV9.SKWRNt2AOAKGIg3V6osANf7rMPoN9XPH1Ls9813bRxg",
      },
    });
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
})();
