import React from "react"

export default function SvgWave({children, colors, viewBox = "0 0 1920 1500"}){
  return(
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={viewBox}>
      <defs>
        <linearGradient id={"Grad1"}>
          <stop offset={"5%"} stopColor={colors[0]}/>
          <stop offset={"95%"} stopColor={colors[1]} />
        </linearGradient>
      </defs>
      {React.Children.map(children,
        child => {
          return (
            <child.type
              {...child.props}
              fill={"url(#Grad1)"}
            >
              {children}
            </child.type>)
        })}
    </svg>
  )
}