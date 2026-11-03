'use client'
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"



const UpdateUser = () => {

  const router = useRouter()
  const { id } = useParams()

  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`http://localhost:3001/users/${id}`)
      const data = await res.json()

      setUser(data)
    }

    fetchUser()
  }, [id])

  if (!user) {
    return <p>Loading user...</p>
  }

  const HandleUpdateUser = async (e) => {

    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const formUser = Object.fromEntries(formData.entries());


    console.log(formUser)

    const res = await fetch(`http://localhost:3001/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formUser),
    });

    const data = await res.json();

    if(data.modifiedCount > 0) {
      router.refresh()

    }



    
  }
  return (
    <form onSubmit={HandleUpdateUser}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="fieldgroup-name">Name</FieldLabel>
          <Input name="name" id="fieldgroup-name" defaultValue={user.name} />
        </Field>
        <Field>
          <FieldLabel htmlFor="fieldgroup-email">Email</FieldLabel>
          <Input
            id="fieldgroup-email"
            type="email"

            name="email"
            defaultValue={user.email}
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

export default UpdateUser;