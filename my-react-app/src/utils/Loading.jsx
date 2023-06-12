import React from "react";
function Loading({text}) {
    // console.log('loading in render');
    return (
        <div className="border w-full h-[100vh] p-2">
            <div className=" border-black w-max  h-[100px] m-auto">
                <i className="text-[1.1rem]">{text}</i>
            </div>
        </div>
    )
}

const MemoLoading = React.memo(Loading)
export default MemoLoading