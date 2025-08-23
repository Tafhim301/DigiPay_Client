import { useUserInfoQuery } from "@/redux/feature/Auth/auth.api"


export default function Wallet() {
    const {data} = useUserInfoQuery(undefined);
    console.log(data);
  return (
    <div>Wallet</div>
  )
}
