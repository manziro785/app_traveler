import { useQuery } from "@tanstack/react-query";
import { fetchProfile } from "../api/user";

const useGetProfileQuery = () => {
  return useQuery({
    queryKey: ["users", "me"],
    queryFn: fetchProfile,
  });
};

export default useGetProfileQuery;
