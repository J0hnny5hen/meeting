declare interface Window {
  Buffer: any
}

declare module '*.styl' {
  const classes: { readonly [key: string]: string }
  export default classes
}
