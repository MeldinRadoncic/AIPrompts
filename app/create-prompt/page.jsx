"use client";
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

import Form from "components/Form"

function CreatePrompt() {
    const [submitting, setSubmitting] = useState(false)
    const [post, setPost] = useState({
        prompt: "",
        tag: "",
    })
    const router = useRouter()
    const { data: session } = useSession()

  

    // Create Prompt
    const createPrompt = async (e) => {
        e.preventDefault()
        setSubmitting(true)
        try {
            // Pass the data to the API
            const response = await fetch("/api/prompt/new", {
                method:"POST",
                cache: "no-cache",
                body: JSON.stringify({
                    prompt: post.prompt,
                    userId: session?.user.id,
                    tag: post.tag,
                }),
            })

            if(response.ok) {
                router.push("/")
            }
        } catch (e) {
            console.error({message: e.message})
        } finally {
            setSubmitting(false)
        }

    }
    
  return (
    <Form
        type="Create"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createPrompt}
    />
  )
}

export default CreatePrompt