"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@/components/Profile";

const MyProfile = () => {
    const [posts, setPosts] = useState([]);
    const { data: session } = useSession();
    const router = useRouter();


    // Fetch the prompts for the specific user
    useEffect(() => {
        if (!session?.user.id || session?.user.id === "undefined" ){
             return router.push("/")
            };

        const fetchPrompts = async () => {
            const res = await fetch(`/api/users/${session?.user.id}/posts`);
            const data = await res.json();
           
            setPosts(data);
        };
        // Only fetch if there is a user logged in
        if (session?.user.id) fetchPrompts();
    }, [session?.user.id]);

    // Edit function
    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`)
      
    };

    // Delete functions
    const handleDelete = async (post) => {
        // Is the user sure they want to delete?
        const hasConfirmed = confirm("Are you sure you want to delete this prompt?");
        if (hasConfirmed) {
            try {
                await fetch(`/api/prompt/${post._id.toString()}`, {
                    method: "DELETE",
                });
                
                // Remove the prompt from the list
                const filterPosts = posts.filter((p) => p._id !== post._id);
                // Update the list
                setPosts(filterPosts);
                router.push("/");

            } catch (error) {
                console.error(error);
            }
        };


    }

  return (
    <Profile
        name={'My'}
        desc='Welcome to my personalized profile page!'
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
    />
  )
}

export default MyProfile