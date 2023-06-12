"use client";
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useSession } from "next-auth/react"

import Form from "components/Form"

function UpdatePrompt() {
    const [submitting, setSubmitting] = useState(false)
    const [post, setPost] = useState({
        prompt: "",
        tag: "",
    })
    const router = useRouter()
    const searchParams = useSearchParams()
    const promptId = searchParams.get("id")
    const { data: session } = useSession()

    // Get the id from the query string's id parameter
    useEffect(() => {
        if(!session?.user.id) return router.push("/")
        const fetchPrompts = async () => {
            const res = await fetch(`/api/prompt/${promptId}`)
            const data = await res.json()
            
            setPost({
                prompt: data.prompt,
                tag: data.tag,
            })
            
        }
        
        if(promptId) fetchPrompts()
    }, [promptId])

    // Update Prompt
    const editPrompt = async (e) => {
        e.preventDefault()
        setSubmitting(true)

        if(!promptId) return alert("Prompt ID not found")

        try {
            // Pass the data to the API
            const response = await fetch(`http://localhost:3000/api/prompt/${promptId}`, {
                method:"PUT",
                body: JSON.stringify({
                    prompt: post.prompt,
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
        type="Update"
        post={post}
        setPost={setPost}
        submitting={submitting}
         handleSubmit={editPrompt}
    />
  )
}

export default UpdatePrompt