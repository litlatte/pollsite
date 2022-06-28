import Link from "next/link";
import { useState } from "react";
import { ErrorMessageCard } from "../../../components/misc/cards";

export default function PollAnswerPage({poll,slug}:any){
    let [errorMessage, setErrorMessage] = useState("");
    let [selectedOption, setSelectedOption] = useState<number|null>(null);
    let [isLoading, setIsLoading] = useState(false);
    async function handleSubmit(){
        if(errorMessage) setErrorMessage("")
        if(isLoading) return;
        if(!selectedOption && selectedOption!==0) return;
        setIsLoading(true);
        try{
        let res = await fetch(`/api/poll/${slug}/answer`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                optionId: poll.options[selectedOption].id,
            })
        })
        if(!res){
            setErrorMessage("Error submitting poll");
            return;
        }
        let data = await res.json();
        if(res.status !== 200){
            setErrorMessage(data.message);
            return;
        }
        window.location.href = `/poll/${slug}/results`;
        }catch(e){
            setErrorMessage("Error submitting poll");
            
        }finally{
            setIsLoading(false);
        }
    }
    return <div className="h-full py-4 w-full flex flex-col items-center justify-center bg-indigo-50">
            {!poll && <div className="text-5xl text-center text-indigo-800">Poll Not found</div>}
            {poll&&<><h1 className="text-4xl mb-8 text-center text-indigo-800">{poll.question}</h1>
            <div className="w-full h-80 max-w-[600px] overflow-y-auto px-8">
            {poll.options.map((ans: any, i:number)=>{
        return <div className={`flex my-2 items-center mx-auto w-full rounded-lg transition duration-300 shadow p-4 ${i==selectedOption?'bg-blue-300':'bg-white hover:bg-indigo-100 hover:scale-105 hover:cursor-pointer'}`} onClick={()=>setSelectedOption(i)}>
                  <div className="rounded-full mr-2 shadow bg-indigo-50 text-xs w-6 h-6 flex items-center justify-center">{i}</div> <div className="text-center">{ans.text}</div>
                </div>
            })}

            </div>
            {isLoading && <div className="text-center text-indigo-800">Submitting...</div>}
            {errorMessage&&<ErrorMessageCard className="my-3">{errorMessage}</ErrorMessageCard>}
            <button onClick={handleSubmit} disabled={selectedOption==null || isLoading} className={`${selectedOption==null?'opacity-40':'hover:scale-105 hover:opacity-80'} transition duration-300 bg-indigo-600 p-4 rounded-lg py-3  text-white`}>Submit</button>
            <Link href={`/poll/${slug}/results`}><a className="mt-4 p-5 bg-orange-500 hover:opacity-80 py-3 hover:scale-110 transition duration-300 text-white rounded-lg text-center">Results</a></Link>
            </>}
        </div>
}

export async function getServerSideProps(context: any){
    // Get the current url and get the only the website
    let res = await fetch(`${process.env.NEXTAUTH_URL}/api/poll/`+context.query.slug, {
    })
    if(!res){
        return {props: {}};
    }
    let data = await res.json();
    if(res.status !== 200){
        return {props: {}};

    }else{
        return {props: {poll: data, slug: context.query.slug}};
    }
}