import {useRouter} from 'next/dist/client/router';
import Header from "../components/Header";
import Footer from "../components/Footer";
import {format} from "date-fns";
import InfoCard from '../components/InfoCard';

function Search({searchResults}) {
    const router = useRouter();
    //console.log(searchResults)
    const {location, startDate, endDate, numOfGuest} = router.query;
    //console.log(router.query.location);
    const formattedStartDate = format(new Date(startDate), "dd MMMM yy");
    const formattedEndDate = format(new Date(endDate), "dd MMMM yy");
    const range = `${formattedStartDate} - ${formattedEndDate}`;

    return (
        <div>
           <Header placeholder={`${location} | ${range} | ${numOfGuest} guests`}/> 

            <main className="flex">
            <section className="flex-grow pt-14 px-6">
                <p className="text-xs">300+ Stays - {range} - for {numOfGuest} guests</p>
                <h1 className="text-3xl font-semibold mt-2 mb-6">Stays in {location.slice(0,1).toUpperCase() +location.slice(1,)}</h1>
                <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
                    <p className="button">Cancellation Flexibility</p>
                    <p className="button">Type of Place</p>
                    <p className="button">Price</p>
                    <p className="button">Rooms and Beds</p>
                    <p className="button">More filters</p>
                </div>
                <div className='flex flex-col'>
                {searchResults && 
                    searchResults.map((item, index) => (
                    <InfoCard
                        key={index}
                        img={item.img}
                        description={item.description}
                        location={item.location}
                        title={item.title}
                        star={item.star}
                        price={item.price}
                        total={item.total}
                    />
                ))}
                </div>
                
            </section>
            </main>
           
           <Footer />
        </div>
    )
}

export default Search


export async function getServerSideProps() {
    const searchResults = await fetch('https://links.papareact.com/isz')
    .then((res) => res.json());
    
    return {
        props: {
            searchResults,
        }
    }
}
