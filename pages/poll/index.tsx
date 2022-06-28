import { getToken } from "next-auth/jwt"
import { useState } from "react"
import { ErrorMessageCard } from "../../components/misc/cards"

export default function PollPage({ token }: any) {
  let [question, setQuestion] = useState("")
  let [answers, setAnswers] = useState<
    {
      answer: String
    }[]
  >([{ answer: "" }, { answer: "" }])
  let [errorMessage, setErrorMessage] = useState("")
  async function handleSubmit() {
    if (errorMessage) setErrorMessage("")
    if (!question) {
      setErrorMessage("Question is required")
      return
    }
    if (answers.some((ans: any) => !ans.answer)) {
      setErrorMessage("Answers Contet is required")
    }
    let res = await fetch("/api/poll", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question,
        options: answers.map((ans: any) => ans.answer),
      }),
    })
    if (!res) {
      setErrorMessage("Error submitting poll")
      return
    }
    let data = await res.json()
    if (res.status !== 200) {
      setErrorMessage(data.message)
      return
    } else {
      // Redirect to the poll
      window.location.href = `/poll/${data.slug}/`
    }
  }
  return (
    <div className="h-full py-4 w-full flex flex-col items-center justify-center bg-indigo-50">
      <h1 className="text-5xl text-center text-indigo-800">Create Poll</h1>
      <label className="text-3xl text-center pb-2">Question</label>
      <input
        placeholder="Question"
        value={question}
        onChange={(e) => {
          setQuestion(e.target.value)
        }}
        className=" p-2 w-80 rounded-xl shadow"
      />
      <div className="text-3xl text-center mt-8">Answers</div>
      <div className="w-fit h-80 grow overflow-y-auto">
        {answers.map((ans, i) => {
          return (
            <div className="flex my-2 items-center mx-auto w-fit">
              <div className="rounded-full mr-2 shadow bg-white w-8 h-8 flex items-center justify-center">
                {i}
              </div>{" "}
              <input
                placeholder={`Answer ${i + 1}`}
                value={ans.answer.toString()}
                onChange={(e) => {
                  setAnswers([
                    ...answers.slice(0, i),
                    { answer: e.target.value },
                    ...answers.slice(i + 1),
                  ])
                }}
                className="p-2 w-72 rounded-xl shadow"
              />
            </div>
          )
        })}
      </div>
      <button
        onClick={() => {
          setAnswers([...answers, { answer: "" }])
        }}
        className="bg-indigo-300 hover:opacity-80 hover:scale-110 transition duration-300 shadow p-3 rounded-lg mt-4"
      >
        + Add Answer
      </button>
      {errorMessage && (
        <ErrorMessageCard className="mt-3">{errorMessage}</ErrorMessageCard>
      )}
      <button
        onClick={handleSubmit}
        className="bg-indigo-700 text-white hover:opacity-80 hover:scale-110 transition duration-300 shadow p-3 rounded-lg mt-4"
      >
        Submit
      </button>
    </div>
  )
}

export async function getServerSideProps(context: any) {
  let token = await getToken({ req: context.req })
  if (!token) {
    context.res.statusCode = 302
    context.res.setHeader("Location", `/`) // Replace <link> with your url link
    return { props: {} }
  }
  return {
    props: {
      token,
    },
  }
}