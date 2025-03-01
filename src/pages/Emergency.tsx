import { FaExclamationTriangle, FaWater, FaWind, FaFire, FaSnowflake, FaBolt } from "react-icons/fa"

const Emergency = () => {
  const emergencyTypes = [
    {
      type: "Flood",
      icon: <FaWater className="text-blue-500" size={24} />,
      instructions: [
        "Move to higher ground immediately",
        "Do not walk, swim, or drive through flood waters",
        "Stay off bridges over fast-moving water",
        "Evacuate if told to do so",
        "Prepare an emergency kit with food, water, and medications",
      ],
    },
    {
      type: "Hurricane",
      icon: <FaWind className="text-teal-500" size={24} />,
      instructions: [
        "Evacuate if advised by authorities",
        "Secure your home by boarding up windows",
        "Prepare emergency supplies for at least 3 days",
        "Keep cell phones charged and have backup batteries",
        "Stay indoors during the hurricane and away from windows",
      ],
    },
    {
      type: "Wildfire",
      icon: <FaFire className="text-orange-500" size={24} />,
      instructions: [
        "Evacuate immediately if ordered",
        "Prepare emergency supplies and important documents",
        "Close all windows, vents, and doors",
        "Remove flammable items from around your home",
        "Monitor local news for updates",
      ],
    },
    {
      type: "Blizzard",
      icon: <FaSnowflake className="text-blue-300" size={24} />,
      instructions: [
        "Stay indoors and avoid travel",
        "Keep emergency heating equipment and supplies",
        "Maintain ventilation when using alternative heat sources",
        "Dress in layers if you must go outside",
        "Check on elderly neighbors and vulnerable individuals",
      ],
    },
    {
      type: "Thunderstorm",
      icon: <FaBolt className="text-yellow-500" size={24} />,
      instructions: [
        "Seek shelter in a sturdy building",
        "Stay away from windows, plumbing, and electrical equipment",
        "Avoid using corded phones and electronics",
        "If outside, avoid open areas and tall objects",
        "Wait 30 minutes after the last thunder before going outside",
      ],
    },
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center mb-6">
        <FaExclamationTriangle className="text-red-500 mr-3" size={28} />
        <h1 className="text-3xl font-bold">Emergency Preparedness</h1>
      </div>

      <p className="mb-8 text-lg">
        Being prepared for extreme weather events can save lives. Below are guidelines for common weather emergencies.
        Always follow instructions from local authorities and emergency services.
      </p>

      <div className="space-y-6">
        {emergencyTypes.map((emergency, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <div className="flex items-center mb-4">
              {emergency.icon}
              <h2 className="text-2xl font-semibold ml-3">{emergency.type}</h2>
            </div>
            <h3 className="font-medium text-lg mb-2">Safety Instructions:</h3>
            <ul className="list-disc list-inside space-y-2 ml-2">
              {emergency.instructions.map((instruction, idx) => (
                <li key={idx}>{instruction}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-blue-100 dark:bg-blue-900 rounded-lg">
        <h3 className="font-semibold text-lg mb-2">Emergency Contacts</h3>
        <p>
          Emergency Services: <strong>911</strong>
        </p>
        <p>
          National Weather Service: <strong>1-800-555-0000</strong>
        </p>
        <p>
          FEMA Helpline: <strong>1-800-621-3362</strong>
        </p>
      </div>
    </div>
  )
}

export default Emergency

