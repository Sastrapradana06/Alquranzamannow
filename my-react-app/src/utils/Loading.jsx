export default function Loading({text}) {
    return (
        <div className="border w-full h-[100vh] p-2">
            <div className=" border-black w-max  h-[100px] m-auto">
                <i className="text-[1.1rem]">{text}</i>
            </div>
        </div>
    )
}