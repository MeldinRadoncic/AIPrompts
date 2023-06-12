import Link from "next/link"


const Form = ({
  type,
  post,
  setPost,
  submitting,
  handleSubmit}) => {

   

  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="desc text-left max-md">
        {type} and share your prompts with the world and see what others have to say!
      </p>

      <form
      onSubmit={handleSubmit}
      className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label htmlFor="prompt">
          <span className="font-satoshi font-semibold text-base text-gray-700">Your AI Prompt</span>
     

        <textarea
        id="prompt"
        value={post.prompt}
        onChange={(e) => setPost({...post, prompt: e.target.value})}
        placeholder="Write your prompt here..."
        required
        className="form_textarea"
        />
        </label>

<label htmlFor="tag">
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tag {' '} 
            <span className="font-normal">(#product,#webdevelopment,#idea)</span>
            </span>
        

        <input
        id="tag"
        value={post.tag}
        onChange={(e) => setPost({...post, tag: e.target.value})}
        placeholder="#Tag"
        required
        className="form_input"
        />
        </label>

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-sm text-gray-500">
           Cancel
          </Link>
          <button
          type="submit"
          disabled={submitting}
          className="text-sm bg-primary-orange rounded-full px-5 py-2 text-white font-semibold "
          >
            {submitting ? `${type}...` : `${type}`}
          </button>

        </div>


      </form>

    </section>
  )
}

export default Form