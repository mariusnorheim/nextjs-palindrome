import React, { useMemo } from "react"
import Router from "next/router"

export type PersonProps = {
  id: number
  firstname: string
  lastname: string
}

// function palindromeCheck(palindrome: string) {
//   const regex = new RegExp("/[\W_]/g") // /[^A-Za-z0-9]/g 
//   const regStr = palindrome.toLowerCase().replace(regex, "")
//   const reverseStr = regStr.split("").reverse().join("")
//   return reverseStr === regStr
// }

function palindromeCheck(palindrome: string) {
  const regStr = palindrome.toLowerCase().trim().split("")
  for (let i = 0; i < regStr.length / 2; i++) {
    if (regStr[i] !== regStr[regStr.length - 1 - i]) {
      return false
    }
  }
  return true
}

const Person: React.FC<{ person: PersonProps }> = ({ person }) => {
  const firstname = person.firstname.trim()
  const lastname = person.lastname.trim()
  const bothnames = person.firstname + person.lastname

  // useMemo hook to recalculate value on change
  const isFirstnamePalindrome = useMemo(() => {
    return palindromeCheck(firstname)
  }, [firstname])
  const isLastnamePalindrome = useMemo(() => {
    return palindromeCheck(lastname)
  }, [lastname])
  const isBothnamesPalindrome = useMemo(() => {
    return palindromeCheck(bothnames)
  }, [bothnames])

  return (
    <div onClick={() => Router.push("/person/[id]", `/person/${person.id}`)}>
      <h3>{person.firstname} {person.lastname}</h3>
      <p>
        Firstname: {person.firstname}<br/>
        Lastname: {person.lastname}
      </p>
      <p>
        <strong>Palindrome check</strong><br/>
        Firstname: {isFirstnamePalindrome ? "Yes" : "No"}<br/>
        Lastname: {isLastnamePalindrome ? "Yes" : "No"}<br/>
        Full name: {isBothnamesPalindrome ? "Yes" : "No"}
      </p>
      <style jsx>{`
        div {
          color: inherit;
          padding: 2rem;
        }
      `}</style>
    </div>
  )
}

export default Person
