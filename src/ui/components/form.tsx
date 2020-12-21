import React, { useState, useCallback } from 'react'

export function useForm(initialFields: { [key: string]: any }, validateOnChange: boolean, validate: (field: { [key: string]: any }) => void) {
  const [fields, setFields] = useState(initialFields)
  const [errors, setErrors] = useState({})

  const handleChange = useCallback((fieldName: string, evt: React.ChangeEvent<HTMLInputElement>) => {
    const fieldItem = { [fieldName]: evt.target.value }
    setFields({ ...fields, ...fieldItem })
    if (validateOnChange) {
      console.info(validate(fieldItem))
    }
  }, [fields])

  const reset = () => { setFields(initialFields); setErrors({}) }

  return { fields, setFields, handleChange, errors, setErrors, reset }
}

export function Form(props: React.FormHTMLAttributes<HTMLFormElement>) {
  const { children, ...rest } = props
  return (
    <form {...rest}>{ children }</form>
  )
}
