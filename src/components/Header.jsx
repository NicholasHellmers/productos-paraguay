export default function Header() {
  return (
    <div>
        <div className="flex justify-center my-5">
            <h1 className="text-4xl font-bold">Paraguay Product DB</h1>
        </div>
        <div className="w-[100%] flex justify-center items-center flex-col gap-5">
            <h2 className="text-2xl font-bold">Check real products across Paraguayan ecommerce stores.</h2>
            <a className="text-2xl font-bold" href="https://www.kaggle.com/datasets/nikihellmers/paraguay-supermarket-products" target="_blank">Click here to download the latest version of the dataset.</a>
        </div>

    </div>
  )
}
