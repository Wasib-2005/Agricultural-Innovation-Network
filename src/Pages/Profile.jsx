import React, { useContext, useEffect, useState } from "react";
import FarmerProfile from "../Components/ProfileComponents/FarmerProfile";
import { UserContext } from "../Contexts/UserContext";
import axios from "axios";
import OfficerProfile from "../Components/ProfileComponents/OfficerProfile";
import ConsumerProfile from "../Components/ProfileComponents/ConsumerProfile";

const Profile = () => {
  const { userData } = useContext(UserContext);

  const [user, setUser] = useState();

  useEffect(() => {
    const fetchFarmerData = async () => {
      if (!userData?.email) return;

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/user/${userData.email}`
        );
        setUser(res.data);
      } catch (error) {
        console.error("Error fetching farmer data:", error);
      }
    };

    fetchFarmerData();
  }, [userData?.email]);

  if (!user?.role) return <p>Loading...</p>;

  return (
    <div>
      {user?.role === "Farmer" ? (
        <FarmerProfile user={user} />
      ) : user?.role === "Officer" ? (
        <OfficerProfile user={user} />
      ) : (
        <ConsumerProfile user={user} />
      )}
    </div>
  );
};

export default Profile;
