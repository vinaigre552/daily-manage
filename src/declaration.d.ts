// declare module '*.svg' {
//   const content: React.FunctionComponent<React.SVGAttributes<SVGSVGElement>>
//   export  default content

// }

declare module '*.svg' {
  const src: string
  export  default src

}

declare module '*.less' {
  const classes: {[className: string]: string}
  export default classes
}

declare module '*.jpg' {
  const src: string,
  export default src
}