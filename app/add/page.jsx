'use client'

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation";

const AddUser = () => {


    const router = useRouter()

    const HandleAddUser = async (e) => {
       e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const user = Object.fromEntries(formData.entries());

  console.log("data from form",user);


  const res = await fetch(`http://localhost:3001/users`, {
    method : "POST",
    headers : {
        "Content-Type" : "application/json"
    },
    body : JSON.stringify(user)
  })


  const data = await res.json()

  if(data.acknowledged){
    router.refresh()
  }

  console.log("data after post", data)


    }
    return (
       <form onSubmit={HandleAddUser}>
         <FieldGroup>
      <Field>
        <FieldLabel htmlFor="fieldgroup-name">Name</FieldLabel>
        <Input name = "name" id="fieldgroup-name" placeholder='Enter name' />
      </Field>
      <Field>
        <FieldLabel htmlFor="fieldgroup-email">Email</FieldLabel>
        <Input
          id="fieldgroup-email"
          type="email"
          name = "email"
          placeholder="Enter email"
        />
        <FieldDescription>
          We&apos;ll send updates to this address.
        </FieldDescription>
      </Field>
      <Field orientation="horizontal">
        <Button type="reset" variant="outline">
          Reset
        </Button>
        <Button type="submit">Submit</Button>
      </Field>
    </FieldGroup>
       </form>
    );
};

export default AddUser;