export default function PollPage({ poll }: any) {
  if (!poll) return <div>Unknown Error</div>
  let mostVotedAnswer = poll.options.reduce((acc: any, ans: any) => {
    if (ans.votes > acc.votes) return ans
    return acc
  })
  let leastVotedAnswer = poll.options.reduce((acc: any, ans: any) => {
    if (ans.votes < acc.votes) return ans
    return acc
  })
  return (
    <div className="w-full bg-indigo-50 h-full flex flex-col items-center justify-center">
      <h1 className="text-5xl mb-8 font-bold text-center text-indigo-600">
        Poll Results
      </h1>
      <div className="w-full flex flex-row items-center justify-around my-4">
        <div className="text-center bg-white p-3 rounded-xl shadow">
          <div className="text-xl font-bold">Total Votes</div>
          <div>{poll.totalVotes}</div>
        </div>
        <div className="text-center bg-green-50 p-3 rounded-xl shadow">
          <div className="text-xl font-bold text-green-600">Most Voted</div>
          <div>{poll.totalVotes?mostVotedAnswer.text:'No votes yet'}</div>
        </div>
        <div className="text-center bg-red-50 p-3 rounded-xl shadow">
          <div className="text-xl font-bold text-red-600">Least Voted</div>
          <div>{poll.totalVotes?leastVotedAnswer.text:'No votes yet'}</div>
        </div>
      </div>
      <div className="w-fit h-fit">
        <h2 className="text-3xl rounded-xl shadow p-6 py-3 bg-indigo-400 text-white">
          {poll.question}
        </h2>
        <div className="flex flex-col">
          {poll.options.map((op: any) => (
            <div className={` rounded-xl shadow p-6 py-3 mt-2 ${poll.totalVotes?(op.id === mostVotedAnswer.id)?'bg-green-100':((op.id==leastVotedAnswer.id || op.votes == leastVotedAnswer.votes)?'bg-red-100':'bg-white'):'No votes yet'} grid grid-cols-6`}>
              <div className="col-span-4">{op.text}{" "}</div>
              <div className="w-fit px-1 ml-2 h-8 min-w-8 flex items-center justify-center bg-black/20 shadow-full rounded">
                {op.votes}
              </div>
              <div className="w-fit px-1 ml-2 h-8 min-w-8 flex items-center justify-center bg-black/20 shadow-full rounded">
                {Math.floor((op.votes / poll.totalVotes) * 100) || 0}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
export async function getServerSideProps(context: any) {
  // Get the current url and get the only the website

  let res = await fetch(`${process.env.NEXTAUTH_URL}/api/poll/` + context.query.slug, {})
  if (!res) {
    return { props: {} }
  }
  let data = await res.json()
  if (res.status !== 200) {
    return { props: {} }
  } else {
    return { props: { poll: data } }
  }
}
