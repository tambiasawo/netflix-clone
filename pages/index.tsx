import type { NextPage } from 'next'
import Head from 'next/head'
import Banner from '../components/Banner'
import Header from '../components/Header'
import Row from '../components/Row'
import { Movie } from '../typings.def'
import requests from '../utils/requests'
import { useRecoilValue } from 'recoil'
import { modalState } from '../atom/modalAtom'
import Modal from '../components/Modal'
import useAuth from '../hooks/useAuth'
import Plans from '../components/Plans'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import FooterColumn from '../components/FooterColumn'
import SocialRow from '../components/SocialRow'
interface Props {
  netflixOriginals: Movie[]
  sample: Movie[]
  trendingNow: Movie[]
  topRated: Movie[]
  actionMovies: Movie[]
  comedyMovies: Movie[]
  horrorMovies: Movie[]
  romanceMovies: Movie[]
  documentaries: Movie[]
  originals: Movie[]
}

const Home = ({
  netflixOriginals,
  trendingNow,
  topRated,
  actionMovies,
  comedyMovies,
  horrorMovies,
  romanceMovies,
  documentaries,
}: Props) => {
  const showModal = useRecoilValue(modalState)
  const { loading } = useAuth()
  const subscription = false
  //if (loading || subscription === null) return null

  /* if (!subscription)
    return (
      <div>
        <Plans />
      </div>
    ) */
  return (
    <div
      className={`relative h-screen bg-gradient-to-b lg:h-[140vh] ${
        showModal && '!h-screen overflow-hidden'
      }`}
    >
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon. co" />
      </Head>
      <Header />

      <main className="relative pb-24 pl-5 space-y-8 md:space-y-16 lg:space-y-24 lg:pl-16">
        <Banner netflixOriginals={netflixOriginals} />
        <section className="md:space-y-20">
          <Row title="Trending Now" movies={trendingNow} />
          <Row title="Top Rated" movies={topRated} />
          <Row title="Action Thrillers" movies={actionMovies} />
          {/* My List */}

          <Row title="Comedies " movies={comedyMovies} />
          <Row title="Scary Movies" movies={horrorMovies} />
          <Row title="Romance Movies" movies={romanceMovies} />
          <Row title="Documentaries" movies={documentaries} />
        </section>

        <footer className="mx-auto max-w-5xl space-y-4">
          <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <FooterColumn
              links={[
                'Audio Description',
                'Investor Realtions',
                'Privacy',
                'Contact Us',
              ]}
            />
            <FooterColumn
              links={['Help Center', 'Jobs', 'Legal Notices', 'Ad Choices']}
            />
            <FooterColumn
              links={['Gift Cards', 'Netflix SHop', 'Preferences']}
            />
            <FooterColumn
              links={['Media Center', 'Terms of Use', 'Corporate Information']}
            />
          </section>
          <section className="flex items-center justify-between">
            <div>
              <button className="border p-1 text-sm text-[grey] hover:text-white">
                Service Code
              </button>
            </div>
            <div>
              <SocialRow />
            </div>
          </section>

          <p className="mx-auto text-center text-sm text-[grey]">
            &copy; 1997-2024 Netflix, Inc.
          </p>
        </footer>
      </main>
      {showModal && <Modal />}
    </div>
  )
}

export const getServerSideProps = async () => {
  const [
    netflixOriginals,
    sample,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  ] = await Promise.all([
    fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(requests.sample).then((res) => JSON.stringify(res)),
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fetchRomanceMovies).then((res) => res.json()),
    fetch(requests.fetchDocumentaries).then((res) => res.json()),
  ])
  console.log({ netflixOriginals })
  return {
    props: {
      netflixOriginals: netflixOriginals?.results,
      sample: sample,
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      romanceMovies: romanceMovies.results,
      documentaries: documentaries.results,
    },
  }
}
export default Home
