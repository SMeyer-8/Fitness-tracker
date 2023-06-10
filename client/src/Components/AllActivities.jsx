import { useState, useEffect } from "react";
import { fetchAllActivities } from "../api/activities";

export function AllActiviteies() {
  const [activities, setActivities] = useState("");

  useEffect(() => {
    async function getAllActivities() {
      const activitiesList = await fetchAllActivities();
      setActivities(activitiesList);
    }
    getAllActivities();
  }, []);

  return (
    <div className="activitiesPage">
      <h1>All Activities</h1>
      {activities.length > 0 &&
        activities.map((activity) => {
          return (
            <div className="activities" key={activity.id}>
              <ul className="activitiesList" style={{ listStyle: "none" }}>
                <li>Activity Name: {activity.name}</li>
                <li>Activity Description: {activity.description}</li>
              </ul>
              <button className="deleteButton" onClick={() => {}}>
                Delete
              </button>
            </div>
          );
        })}
    </div>
  );
}
