import React from 'react'
import { GetServerSideProps } from 'next'
import Layout from '../components/Layout'
import Person, { PersonProps } from '../components/Person'

type Props = {
  people: PersonProps[]
}

const Index: React.FC<Props> = props => {
  return (
    <Layout>
      <div className="page">
        <h1>People</h1>
        <main>
          {props.people?.map(person => (
            <div key={person.id} className="person">
              <Person person={person} />
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .person {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .person:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .person + .person {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch('http://localhost:3000/api/person')
  const people = await res.json()
  return {
    props: JSON.parse(JSON.stringify({ people })),
  }
}

export default Index
