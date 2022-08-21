import React, { useState } from 'react'
import Layout from '../components/Layout'
import Router from 'next/router'

const CreatePerson: React.FC = () => {
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      const body = { firstname, lastname }
      await fetch(`/api/person`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      await Router.push('/')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Layout>
      <div>
        <form
          onSubmit={submitData}>
          <h1>Create Person</h1>
          <span>Firstname: </span>
          <input
            autoFocus
            onChange={e => setFirstname(e.target.value)}
            placeholder="Firstname"
            type="text"
            value={firstname}
          /><br/>
          <span>Lastname: </span>
          <input
            onChange={e => setLastname(e.target.value)}
            placeholder="Lastname"
            type="text"
            value={lastname}
          /><br/>
          <input
            disabled={!firstname || !lastname}
            type="submit"
            value="Create"
          />
          <button className="back" onClick={() => Router.push('/')}>
            Cancel
          </button>
        </form>
      </div>
      <style jsx>{`
        .page {
          background: white;
          padding: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        button {
          font-size: 16px;
          background: #ececec;
          border: 0;
          border-radius: 0.125rem;
          padding: 1rem 2rem;
        }

        input[type='text'],
        textarea {
          width: 80%;
          padding: 0.5rem;
          margin: 0.5rem 0;
          border-radius: 0.25rem;
          border: 0.125rem solid rgba(0, 0, 0, 0.2);
        }

        input[type='submit'] {
          background: #ececec;
          border: 0;
          padding: 1rem 2rem;
        }

        .back {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  )
}

export default CreatePerson;
