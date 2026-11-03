'use client'

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link";
import { useRouter } from "next/navigation";
import UpdateUser from "@/components/dialog";



const UserCard = ({user}) => {

    const router = useRouter()

    const {_id} = user

    const HandleDelete = async(id) => {

        const res = await fetch(`http://localhost:3001/users/${id}`, {
            method : "DELETE"
        })

        const data = await res.json()

        if(data.deletedCount > 0) {
            router.refresh()
        }
        console.log(data)

    }
    return (
        <Card className="relative mx-auto w-full max-w-sm pt-0">
     
      
      <CardHeader>
        <CardAction>
          <Badge variant="secondary">Featured</Badge>
        </CardAction>
        <CardTitle>{user.name}</CardTitle>
        <CardDescription>
          Email : {user.email}
        </CardDescription>
      </CardHeader>
      
      <CardFooter>
        
        <Link href={`/users/${user._id}`}><Button className="w-full">Ditels</Button></Link>
        <Link className="mx-3" href={`/update/${user._id}`}><Button>Edit</Button></Link>
       
        <Button onClick = {() => HandleDelete(_id)} >Delete</Button>
      </CardFooter>
    </Card>
    );
};

export default UserCard;