export async function fetchAllActivities() {
  try {
    const response = await fetch("/api/activities");
    const result = await response.json();
    console.log("result data: ", result.data, "Just result : ", result);
    return result.data;
  } catch (error) {
    console.log("error: ", error);
  }
}

export async function createActivity(name, description) {
  try {
    const response = await fetch("/api/activities", {
      method: "POST",
      body: JSON.stringify({
        post: {
          name,
          description,
        },
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
}
