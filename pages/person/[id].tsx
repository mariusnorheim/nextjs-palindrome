import React, { useState } from 'react'
import { GetServerSideProps } from 'next'
import Layout from '../../components/Layout'
import Router from 'next/router'
import { PersonProps } from '../../components/Person'

async function deletePerson(id: number): Promise<void> {
  await fetch(`/api/person/${id}`, {
    method: 'DELETE',
  })
  await Router.push('/')
}

const Person: React.FC<PersonProps> = props => {
  const [firstname, setFirstname] = useState(props.firstname)
  const [lastname, setLastname] = useState(props.lastname)

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      const id = props.id
      const body = { firstname, lastname }
      await fetch(`/api/person/${id}`, {
        method: 'PUT',
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
          <h1>{props.firstname} {props.lastname}</h1>
          <span>Firstname: </span>
          <input
            autoFocus
            onChange={e => setFirstname(e.target.value)}
            type="text"
            value={firstname}
          /><br/>
          <span>Lastname: </span> 
          <input
            onChange={e => setLastname(e.target.value)}
            type="text"
            value={lastname}
          /><br/>
          <input
            disabled={!firstname || !lastname}
            type="submit"
            value="Update"
          />
          <button onClick={() => deletePerson(props.id)}>
            Delete
          </button>
          <button className="back" onClick={() => Router.push('/')}>
            Cancel
          </button>
        </form>
      </div>
      <style jsx>{`
        .page {
          background: white;
          padding: 2rem;
        }

        .actions {
          margin-top: 2rem;
        }

        button {
          font-size: 16px;
          background: #ececec;
          border: 0;
          border-radius: 0.125rem;
          padding: 1rem 2rem;
        }

        button + button {
          margin-left: 1rem;
        }

        input + button {
          margin-left: 1rem;
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
      `}</style>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(`http://localhost:3000/api/person/${context.params.id}`)
  const data = await res.json()
  return { props: JSON.parse(JSON.stringify({ ...data })) }
}

export default Person
