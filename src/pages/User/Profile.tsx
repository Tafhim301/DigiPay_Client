import { useUserInfoQuery } from "@/redux/feature/Auth/auth.api"


export default function Profile() {
    const {data} = useUserInfoQuery(undefined)
    const user = data?.data

  return (
    <div>{user?.name}-{user?.phone}</div>
  )
}
