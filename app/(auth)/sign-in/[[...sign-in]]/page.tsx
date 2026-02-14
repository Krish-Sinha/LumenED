import { SignIn } from "@clerk/nextjs"; 
export default function Page() {
  return (
    <div className="flex mt-30 h-full items-center justify-center">
        <SignIn/>
    </div>
  )
}