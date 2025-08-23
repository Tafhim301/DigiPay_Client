
export default function Testimonial() {
  return (
         <section className="bg-gray-50 p-20 shadow-xl rounded-2xl my-20">
        <div className="container text-center">
          <h2 className="text-3xl font-extrabold mb-12">What Our Users Say</h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="p-6 bg-white rounded-2xl shadow-md">
              <p className="italic">“DigiPay made sending money to my family super easy and fast!”</p>
              <h4 className="mt-4 font-semibold">— Sarah K.</h4>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow-md">
              <p className="italic">“The best wallet app I’ve used. Secure and reliable!”</p>
              <h4 className="mt-4 font-semibold">— Jamal R.</h4>
            </div>
          </div>
        </div>
      </section>
  )
}
