export type TimesBlackBenefitSection =
  | "WELCOME"
  | "BONUS REWARDS"
  | "EVENTS"
  | "SIGNATURE BENEFITS"
  | "MILESTONES"
  | "EXCLUSIVE DISCOUNTS";

export type TimesBlackBenefit = {
  id: string;
  section: TimesBlackBenefitSection;
  merchant: string;
  title: string;
  tag: string | null;
  source: string;
  updatedAt: string;
};

export const timesBlackSectionOrder: TimesBlackBenefitSection[] = [
  "WELCOME",
  "SIGNATURE BENEFITS",
  "MILESTONES",
  "BONUS REWARDS",
  "EVENTS",
  "EXCLUSIVE DISCOUNTS",
];

export const timesBlackBenefits: TimesBlackBenefit[] = [
  {
    "id": "a59befb3-1ddb-4261-86e1-a64744169bb6",
    "section": "WELCOME",
    "merchant": "LOHONO | EASEMYTRIP",
    "title": "Choose between a ₹12,000 Lohono voucher or a ₹10,000 EaseMyTrip voucher",
    "tag": null,
    "source": "https://www.timesblack.com/benefits/choice/welcome/LOHONO%20|%20EASEMYTRIP",
    "updatedAt": "2025-09-12T09:42:55.038+00:00"
  },
  {
    "id": "9770ec8a-8fe4-4369-a692-e0d2bf083f1a",
    "section": "EXCLUSIVE DISCOUNTS",
    "merchant": "ADANI | SHALIMAR | ENCALM",
    "title": "Complimentary First-Class Lounge Access for Two in Mumbai, Delhi or Bengaluru",
    "tag": "Eligibility-Based",
    "source": "https://www.timesblack.com/benefits/choice/exclusive-discounts/first-class-lounge",
    "updatedAt": "2026-07-17T09:00:47.807+00:00"
  },
  {
    "id": "9169f66c-106b-48d0-bb0f-9c21e54b2add",
    "section": "WELCOME",
    "merchant": "ONEVASCO & MORE",
    "title": "Travel visa benefits worth ₹10,000 — Doorstep visa services, lounge access & more",
    "tag": "Exclusive",
    "source": "https://www.timesblack.com/benefits/choice/welcome/One%20Vasco,%20Atlys",
    "updatedAt": "2025-11-26T06:45:54.566+00:00"
  },
  {
    "id": "d8e32cd6-7a71-4e39-b567-69efc68951f2",
    "section": "EXCLUSIVE DISCOUNTS",
    "merchant": "ADANI | NICOBAR | ENCALM",
    "title": "Complimentary Business-Class Lounge Access in Mumbai, Delhi, Bengaluru or Hyderabad",
    "tag": null,
    "source": "https://www.timesblack.com/benefits/choice/exclusive-discounts/business-class-lounge",
    "updatedAt": "2026-07-17T09:01:18.540+00:00"
  },
  {
    "id": "62ed75f6-2a18-482d-9447-f7f1364440d1",
    "section": "WELCOME",
    "merchant": "CRIBLIFE SERVICES",
    "title": "From the everyday to the extraordinary, let us fulfil six of your requests with ease",
    "tag": null,
    "source": "https://www.timesblack.com/benefits/welcome/crib-life",
    "updatedAt": "2026-06-08T17:00:33.874+00:00"
  },
  {
    "id": "e5bc3fa2-6cb4-424c-ba03-d945c7975fc4",
    "section": "SIGNATURE BENEFITS",
    "merchant": "ICICI BANK",
    "title": "Accelerated rewards like never before",
    "tag": null,
    "source": "https://www.timesblack.com/benefits/signature-benefits/ishop",
    "updatedAt": "2026-04-09T22:52:31.286+00:00"
  },
  {
    "id": "a968cf92-f883-4f81-a892-380a49a84727",
    "section": "WELCOME",
    "merchant": "TONI&GUY",
    "title": "Complimentary ₹3,000 gift voucher for all your grooming needs",
    "tag": null,
    "source": "https://www.timesblack.com/benefits/welcome/toni-and-guy",
    "updatedAt": "2026-05-14T10:38:47.117+00:00"
  },
  {
    "id": "206c8177-7730-4eaa-a654-e09403ee5ffb",
    "section": "EXCLUSIVE DISCOUNTS",
    "merchant": "VISA MEET & GREET",
    "title": "Skip the long queues and get a VIP airport experience",
    "tag": null,
    "source": "https://www.timesblack.com/benefits/exclusive-discounts/visa-meet-greet",
    "updatedAt": "2026-05-31T18:24:50.502+00:00"
  },
  {
    "id": "9c9e1608-dd7b-43d8-a53d-c727affd8cc5",
    "section": "WELCOME",
    "merchant": "THE QUORUM CLUB",
    "title": "20% off on F&B at Cafe Reed (Mumbai), The Wine Corner (Hyderabad) and 689 (Gurgaon)",
    "tag": "No membership required",
    "source": "https://www.timesblack.com/benefits/welcome/the-quorum-dining",
    "updatedAt": "2026-01-23T07:27:59.169+00:00"
  },
  {
    "id": "1f6b05f3-0ff9-49e6-a3d0-d1dd736126de",
    "section": "EXCLUSIVE DISCOUNTS",
    "merchant": "VISA",
    "title": "Breeze through airport security with complimentary Fast Track Lane access",
    "tag": null,
    "source": "https://www.timesblack.com/benefits/exclusive-discounts/visa-fast-track",
    "updatedAt": "2026-06-24T06:35:55.541+00:00"
  },
  {
    "id": "ccfd8cca-7fd4-4f65-ad0a-6d79d5194dfa",
    "section": "EXCLUSIVE DISCOUNTS",
    "merchant": "KLOOK",
    "title": "Make travel memorable with 10% off on Klook experiences over ₹5,000",
    "tag": null,
    "source": "https://www.timesblack.com/benefits/exclusive-discounts/klook-swipe",
    "updatedAt": "2026-06-14T11:03:13.828+00:00"
  },
  {
    "id": "482e1f50-4f9c-4031-ad80-ebb36aed2d8e",
    "section": "MILESTONES",
    "merchant": "KLOOK",
    "title": "Your curated itinerary to iconic destinations with a voucher of ₹10,000 from Klook",
    "tag": "Unlocks at 2L annual spend",
    "source": "https://www.timesblack.com/benefits/milestones/klook-milestone",
    "updatedAt": "2026-03-26T06:04:45.362+00:00"
  },
  {
    "id": "a823b527-339e-4f96-ac84-5bd4aaa6dcb6",
    "section": "EXCLUSIVE DISCOUNTS",
    "merchant": "VISA",
    "title": "Get rewarded on international spends with Visa—₹1,000 Amazon voucher assured",
    "tag": "Limited Period Offer",
    "source": "https://www.timesblack.com/benefits/exclusive-discounts/amazon-offer-visa",
    "updatedAt": "2026-01-29T08:08:42.805+00:00"
  },
  {
    "id": "b09824df-ac8f-4750-b3ff-374b63f89eb1",
    "section": "MILESTONES",
    "merchant": "AVIS | WEWORK | THUMBY",
    "title": "Choose between 10 WeWork passes and an airport transfer via helicopter or sedan",
    "tag": "Unlocks at 5L annual spend",
    "source": "https://www.timesblack.com/benefits/choice/milestones/WEWORK%20|%20THUMBY%20|%20AVIS%20|%20ITH",
    "updatedAt": "2025-11-24T05:49:54.353+00:00"
  },
  {
    "id": "3aace88e-52ae-430b-90f0-aac662d0e2fb",
    "section": "BONUS REWARDS",
    "merchant": "LOHONO STAYS",
    "title": "Unlock a ₹12,000 Lohono Stay Voucher: Elevate Your Next Escape",
    "tag": "July Special",
    "source": "https://www.timesblack.com/benefits/bonus-rewards/lohono-spend-campaign",
    "updatedAt": "2026-07-16T09:59:52.288+00:00"
  },
  {
    "id": "cfadd191-c5c7-4582-bf13-7798f3bcd533",
    "section": "EXCLUSIVE DISCOUNTS",
    "merchant": "PRIVÉ BY TIMES PRIME",
    "title": "Premium global subscriptions in one membership",
    "tag": null,
    "source": "https://www.timesblack.com/benefits/exclusive-discounts/prive-subscription-offer",
    "updatedAt": "2026-07-09T12:06:35.950+00:00"
  },
  {
    "id": "c769a9ba-32d1-4bd2-9d54-9cd18bd809dd",
    "section": "BONUS REWARDS",
    "merchant": "TATA CLIQ LUXURY",
    "title": "Earn the Marshall Acton III worth ₹31,999: The ultimate sound of luxury",
    "tag": "September to October",
    "source": "https://www.timesblack.com/benefits/bonus-rewards/marshall-spend-campaign",
    "updatedAt": "2026-07-16T09:48:28.360+00:00"
  },
  {
    "id": "64353387-1e16-4061-b506-4aa77289034e",
    "section": "WELCOME",
    "merchant": "THE QUORUM CLUB",
    "title": "Exclusive access to select events at The Quorum",
    "tag": null,
    "source": "https://www.timesblack.com/benefits/welcome/the-quorum-events",
    "updatedAt": "2026-01-27T08:26:28.428+00:00"
  },
  {
    "id": "2d833c7c-6ec6-4c89-bba5-7bceb58465b4",
    "section": "EXCLUSIVE DISCOUNTS",
    "merchant": "TRUEFITT & HILL",
    "title": "Complimentary Truefitt & Hill Royal Signature Service worth ₹3,100",
    "tag": "Limited Period Offer",
    "source": "https://www.timesblack.com/benefits/exclusive-discounts/truefit-and-hill-offer",
    "updatedAt": "2026-07-07T05:56:30.647+00:00"
  },
  {
    "id": "d9c3da45-d04e-45f3-ad43-d6c591ac8261",
    "section": "EXCLUSIVE DISCOUNTS",
    "merchant": "LOHONO STAYS",
    "title": "Experience luxury living with 20% off across all villas on Lohono Stays",
    "tag": null,
    "source": "https://www.timesblack.com/benefits/exclusive-discounts/lohono-stay-offer",
    "updatedAt": "2026-01-27T08:28:53.746+00:00"
  },
  {
    "id": "a8943cad-7991-4d19-aa85-79671bf8d7e9",
    "section": "BONUS REWARDS",
    "merchant": "SOULTREE",
    "title": "Curated SoulTree Nerolii Essentials Gift Box worth ₹3,675 to elevate everyday wellness",
    "tag": "August",
    "source": "https://www.timesblack.com/benefits/bonus-rewards/soultree-spend-campaign",
    "updatedAt": "2026-07-16T09:47:38.151+00:00"
  },
  {
    "id": "6b421b1a-7d12-4503-8af2-40fa35d5a545",
    "section": "MILESTONES",
    "merchant": "TATA CLIQ LUXURY",
    "title": "Indulge in luxury brands with a ₹10,000 voucher of Tata CLiQ Luxury",
    "tag": "Unlocks at 10L annual spend",
    "source": "https://www.timesblack.com/benefits/milestones/tata-cliq-milestone",
    "updatedAt": "2025-12-12T09:14:37.761+00:00"
  },
  {
    "id": "921a0162-fb44-4524-b14e-1fd29b27e560",
    "section": "EXCLUSIVE DISCOUNTS",
    "merchant": "DINEWITHVISA",
    "title": "Savor exceptional culinary experiences at top-tier restaurants",
    "tag": null,
    "source": "https://www.timesblack.com/benefits/exclusive-discounts/visa-dining-offer",
    "updatedAt": "2026-05-14T10:56:51.485+00:00"
  },
  {
    "id": "f59c918e-1248-4f7e-a691-de50f0591834",
    "section": "EXCLUSIVE DISCOUNTS",
    "merchant": "FARFETCH",
    "title": "Save up to USD 300 on FARFETCH — Your Luxury Fashion Destination",
    "tag": null,
    "source": "https://www.timesblack.com/benefits/exclusive-discounts/farfetch-visa-offer",
    "updatedAt": "2026-07-08T13:38:40.727+00:00"
  },
  {
    "id": "52782fd0-af71-441a-8be6-426c4d057cea",
    "section": "MILESTONES",
    "merchant": "LOHONO | AYATANA",
    "title": "Choose between Lohono voucher worth ₹20,000 and Ayatana stay worth ₹20,000",
    "tag": "Unlocks at 20L annual spend",
    "source": "https://www.timesblack.com/benefits/choice/milestones/AYATANA%20|%20LOHONO%20STAYS",
    "updatedAt": "2025-08-31T19:07:47.456+00:00"
  },
  {
    "id": "0253a2ea-6108-432e-b10e-74fb1a0969a2",
    "section": "BONUS REWARDS",
    "merchant": "ONEVASCO",
    "title": "Travel Visa Service Credits worth ₹10,000 for hassle-free visa services",
    "tag": "September",
    "source": "https://www.timesblack.com/benefits/bonus-rewards/onevasco-spend-campaign",
    "updatedAt": "2026-07-17T09:00:30.540+00:00"
  },
  {
    "id": "3d2d4da2-43cb-470b-a6c2-cd1f094548a1",
    "section": "EXCLUSIVE DISCOUNTS",
    "merchant": "AAYNA CLINIC",
    "title": "Complimentary AAYNA Privé experience worth ₹23,000",
    "tag": "Limited Period Offer",
    "source": "https://www.timesblack.com/benefits/exclusive-discounts/aayna-prive-offer",
    "updatedAt": "2026-07-17T06:02:34.494+00:00"
  },
  {
    "id": "d46adaa0-1e13-4818-bf4e-88ae0f03f8ee",
    "section": "SIGNATURE BENEFITS",
    "merchant": "FOREX MARKUP",
    "title": "Earn 2.5% reward points on international transactions, with a low 1.49% forex fee",
    "tag": null,
    "source": "https://www.timesblack.com/benefits/signature-benefits/forex-markup",
    "updatedAt": "2025-12-15T11:33:58.065+00:00"
  },
  {
    "id": "595092a8-1631-448a-86ce-fbfff46ba90f",
    "section": "EXCLUSIVE DISCOUNTS",
    "merchant": "NAPPA DORI",
    "title": "Elevate your style with a 20% discount on all products",
    "tag": null,
    "source": "https://www.timesblack.com/benefits/exclusive-discounts/nappa-dori-swipe-discount",
    "updatedAt": "2026-05-14T11:03:33.982+00:00"
  },
  {
    "id": "f66c7c5e-82a6-4776-a391-06d96a2ae376",
    "section": "EXCLUSIVE DISCOUNTS",
    "merchant": "SLEEEP BY ITC HOTELS",
    "title": "Avail 20% off on products from the ITC Hotel’s Sleeep Ensemble",
    "tag": null,
    "source": "https://www.timesblack.com/benefits/exclusive-discounts/sleep-itc-offer",
    "updatedAt": "2026-02-05T05:54:48.723+00:00"
  },
  {
    "id": "f1888094-a4a4-450b-8fba-e7967a2b5ed8",
    "section": "BONUS REWARDS",
    "merchant": "TGL",
    "title": "Luxury Artisanal Gift Box worth ₹2,499 to savour the art of fine tea",
    "tag": "October",
    "source": "https://www.timesblack.com/benefits/bonus-rewards/tgl-spend-campaign",
    "updatedAt": "2026-07-17T08:59:29.499+00:00"
  },
  {
    "id": "dd7b0d8d-d13e-4e6d-95d6-efea6a61e379",
    "section": "WELCOME",
    "merchant": "THE QUORUM CLUB",
    "title": "20% off at all F&B restaurants & the Member's Lounge",
    "tag": "For existing Quorum members",
    "source": "https://www.timesblack.com/benefits/welcome/the-quorum-lounge",
    "updatedAt": "2025-12-15T11:27:18.270+00:00"
  },
  {
    "id": "ee0e555e-4718-426d-84d0-f6d19b6f190e",
    "section": "MILESTONES",
    "merchant": "TIMES BLACK",
    "title": "Your Times Black journey continues with next year’s annual fee waived off",
    "tag": "Unlocks at 25L annual spend",
    "source": "https://www.timesblack.com/benefits/milestones/fee-waiver-milestone",
    "updatedAt": "2026-05-14T11:05:12.991+00:00"
  },
  {
    "id": "fa947353-38aa-465b-9671-11c9be389122",
    "section": "WELCOME",
    "merchant": "ZOMATO",
    "title": "Annual Zomato Gold membership for your food ordering & dining needs",
    "tag": null,
    "source": "https://www.timesblack.com/benefits/welcome/zomato-gold",
    "updatedAt": "2025-12-10T06:02:47.466+00:00"
  },
  {
    "id": "e6f32d98-cce8-441d-bc3c-3679b54720a2",
    "section": "WELCOME",
    "merchant": "INTERFLORA",
    "title": "Floral gifting with a ₹1,000 gift voucher from Interflora",
    "tag": null,
    "source": "https://www.timesblack.com/benefits/welcome/interflora-welcome",
    "updatedAt": "2025-12-10T06:02:08.088+00:00"
  },
  {
    "id": "9e5d4ffc-f692-4dfe-9d92-7b18434af6b3",
    "section": "SIGNATURE BENEFITS",
    "merchant": "LOUNGE ACCESS",
    "title": "Unlimited access to over 1,300 lounges worldwide across 600 cities",
    "tag": null,
    "source": "https://www.timesblack.com/benefits/signature-benefits/lounge-access",
    "updatedAt": "2026-05-14T10:41:58.534+00:00"
  },
  {
    "id": "73f4f0c6-731d-487a-acb7-4da627f1254a",
    "section": "SIGNATURE BENEFITS",
    "merchant": "AIR INDIA MAHARAJA POINTS",
    "title": "Convert 1 Reward Point into 1 Maharaja Point instantly",
    "tag": null,
    "source": "https://www.timesblack.com/benefits/signature-benefits/maharaja-points-timesblack",
    "updatedAt": "2026-06-15T13:30:02.144+00:00"
  },
  {
    "id": "e4294380-532b-4260-8ad4-d49a32fe1cfa",
    "section": "EXCLUSIVE DISCOUNTS",
    "merchant": "KAMA AYURVEDA",
    "title": "Elevate your self-care with 10% off on all Kama Ayurveda products",
    "tag": null,
    "source": "https://www.timesblack.com/benefits/exclusive-discounts/kama-ayurveda-offer",
    "updatedAt": "2026-05-30T06:58:53.334+00:00"
  },
  {
    "id": "498cd95c-1387-4505-a43a-66fd327d2524",
    "section": "EXCLUSIVE DISCOUNTS",
    "merchant": "AEONIC",
    "title": "A wellness membership that has you fully covered",
    "tag": null,
    "source": "https://www.timesblack.com/benefits/exclusive-discounts/aeonic-membership",
    "updatedAt": "2026-05-22T05:27:48.902+00:00"
  },
  {
    "id": "8678309a-b440-466f-8733-fc8070a57d77",
    "section": "EXCLUSIVE DISCOUNTS",
    "merchant": "VISA",
    "title": "Dine in sophistication: Enjoy up to 20%* off across Asia Pacific’s finest restaurants",
    "tag": null,
    "source": "https://www.timesblack.com/benefits/exclusive-discounts/visa-dine-and-save-offer",
    "updatedAt": "2026-05-14T10:57:53.466+00:00"
  },
  {
    "id": "51a43d73-de08-433e-b9c0-537573b6d293",
    "section": "EXCLUSIVE DISCOUNTS",
    "merchant": "VISA POWER TRAVEL",
    "title": "Travel the world and earn up to 20% rewards on your spends",
    "tag": null,
    "source": "https://www.timesblack.com/benefits/exclusive-discounts/visa-power-travel",
    "updatedAt": "2026-06-24T06:23:36.868+00:00"
  },
  {
    "id": "0d4adf63-b784-4814-ad37-37852090274c",
    "section": "EXCLUSIVE DISCOUNTS",
    "merchant": "AAYNA CLINIC",
    "title": "Avail a 20% discount on the entire range of AAYNA services",
    "tag": null,
    "source": "https://www.timesblack.com/benefits/exclusive-discounts/aayna-offer",
    "updatedAt": "2026-01-27T08:33:38.823+00:00"
  },
  {
    "id": "3064cf17-c99d-48bf-bab3-6b121edc2cb2",
    "section": "EXCLUSIVE DISCOUNTS",
    "merchant": "NAPPA DORI",
    "title": "Exclusive Nappa Dori x Times Black ICICI Bank Travel Organizer",
    "tag": "Limited Period Offer",
    "source": "https://www.timesblack.com/benefits/exclusive-discounts/nappa-dori-travel-organizer",
    "updatedAt": "2026-05-30T06:59:18.522+00:00"
  },
  {
    "id": "4428cfc4-e77a-495b-bc42-c6e4985f9017",
    "section": "EXCLUSIVE DISCOUNTS",
    "merchant": "AAYNA CLINIC",
    "title": "Avail 25% off on boutique salon services at AAYNA Clinic",
    "tag": null,
    "source": "https://www.timesblack.com/benefits/exclusive-discounts/aayna-boutique-offer",
    "updatedAt": "2026-01-27T08:34:16.000+00:00"
  },
  {
    "id": "1db2a064-271b-4be7-8c2a-7df4bb6f5d3a",
    "section": "EXCLUSIVE DISCOUNTS",
    "merchant": "HUMANEDGE",
    "title": "Humanedge Essentials: Your foundation for precision longevity",
    "tag": "Exclusive Limited Period Offer",
    "source": "https://www.timesblack.com/benefits/exclusive-discounts/humanedge-offer",
    "updatedAt": "2026-06-24T06:17:37.897+00:00"
  },
  {
    "id": "64d7cb28-b0ad-4eb4-a5ac-7d51910ac268",
    "section": "EXCLUSIVE DISCOUNTS",
    "merchant": "VISA",
    "title": "Stay connected seamlessly across borders with a complimentary global eSIM",
    "tag": null,
    "source": "https://www.timesblack.com/benefits/exclusive-discounts/visa-travelgoogoo",
    "updatedAt": "2026-05-14T11:07:34.226+00:00"
  },
  {
    "id": "42811a02-4ca4-4c54-bc7a-008858664212",
    "section": "EXCLUSIVE DISCOUNTS",
    "merchant": "VISA DESTINATIONS",
    "title": "Unlock exclusive savings across leading destinations",
    "tag": null,
    "source": "https://www.timesblack.com/benefits/exclusive-discounts/visa-destinations",
    "updatedAt": "2026-06-04T15:30:35.724+00:00"
  },
  {
    "id": "92aa18d3-813a-4229-9059-91f410f9251f",
    "section": "WELCOME",
    "merchant": "THE QUORUM CLUB",
    "title": "20% off on the standard membership",
    "tag": "A members' only lifestyle club",
    "source": "https://www.timesblack.com/benefits/welcome/quorum-club-membership",
    "updatedAt": "2026-07-08T12:41:24.160+00:00"
  },
  {
    "id": "de85065d-ec7a-4a52-a8ae-0f31266f3c75",
    "section": "EXCLUSIVE DISCOUNTS",
    "merchant": "APPLE",
    "title": "Up to ₹15,000 instant cashback on Apple products",
    "tag": null,
    "source": "https://www.timesblack.com/benefits/exclusive-discounts/apple-offer-icici",
    "updatedAt": "2026-07-04T04:12:46.381+00:00"
  },
  {
    "id": "3edc448a-1525-4473-a693-6c2e29e685c0",
    "section": "EXCLUSIVE DISCOUNTS",
    "merchant": "GOOGLE",
    "title": "Up to ₹10,000 instant discount on Google Pixel smartphones",
    "tag": null,
    "source": "https://www.timesblack.com/benefits/exclusive-discounts/googlepixel-offer-icici",
    "updatedAt": "2026-07-02T10:57:40.979+00:00"
  },
  {
    "id": "bfe69b70-3eba-461a-a5c0-36e3841a783f",
    "section": "EXCLUSIVE DISCOUNTS",
    "merchant": "ELIVAAS",
    "title": "Stay 3 nights for the price of 2 or get 50% off your 2nd night on a 2-night stay",
    "tag": null,
    "source": "https://www.timesblack.com/benefits/exclusive-discounts/visa-elivaas",
    "updatedAt": "2026-01-27T08:30:27.302+00:00"
  },
  {
    "id": "5dbe1eef-be6e-4e74-9ea1-5fe6ac55d0e6",
    "section": "EXCLUSIVE DISCOUNTS",
    "merchant": "MISREE",
    "title": "Savour the finest sweets with 20% off on Misree’s collection",
    "tag": null,
    "source": "https://www.timesblack.com/benefits/exclusive-discounts/misree-haldirams-offer",
    "updatedAt": "2026-05-14T11:04:09.439+00:00"
  },
  {
    "id": "d7d19739-7855-44b2-8b02-ed4c23fd93bc",
    "section": "EXCLUSIVE DISCOUNTS",
    "merchant": "NAPPA DORI",
    "title": "Nappa Dori Rover Check-in Bag worth ₹62,000, now yours for ₹29,760",
    "tag": null,
    "source": "https://www.timesblack.com/benefits/exclusive-discounts/nappa-dori-swipe",
    "updatedAt": "2026-01-27T08:28:07.504+00:00"
  },
  {
    "id": "8a1e8ec8-9d8a-4e35-b824-96fd143eb5ac",
    "section": "EXCLUSIVE DISCOUNTS",
    "merchant": "TATA CLIQ LUXURY",
    "title": "Additional 10% discount of up to ₹2,500 on purchases of ₹15,000 or more",
    "tag": null,
    "source": "https://www.timesblack.com/benefits/exclusive-discounts/tata-cliq-offer-may",
    "updatedAt": "2026-06-24T06:37:23.515+00:00"
  },
  {
    "id": "00f4eb8f-2b3b-444b-819e-5d2573c36c4a",
    "section": "EVENTS",
    "merchant": "THE QUORUM CLUB",
    "title": "Candlelight Signature: An evening of timeless melodies",
    "tag": "25th July 2026",
    "source": "https://www.timesblack.com/benefits/events/candlelight-sig-mumbai",
    "updatedAt": "2026-07-08T08:07:41.372+00:00"
  },
  {
    "id": "6c456b76-c282-4cfb-a07f-b26400141313",
    "section": "EVENTS",
    "merchant": "TIMES OF INDIA",
    "title": "Inked in History: A Guided Tour of The Times of India Printing Press in Chennai",
    "tag": "Chennai",
    "source": "https://www.timesblack.com/benefits/events/printing-press-chennai-july",
    "updatedAt": "2026-07-07T15:40:20.908+00:00"
  },
  {
    "id": "b6dfafb5-3e42-4f7c-8c4a-9f22d3c36809",
    "section": "EXCLUSIVE DISCOUNTS",
    "merchant": "ITC HOTELS",
    "title": "Stay 3 nights for the price of 2 or get 50% off your 2nd night on a 2-night stay",
    "tag": null,
    "source": "https://www.timesblack.com/benefits/exclusive-discounts/visa-itc",
    "updatedAt": "2026-05-31T18:25:09.578+00:00"
  },
  {
    "id": "51471b60-63e6-4a0b-90dc-a1f141778df6",
    "section": "EVENTS",
    "merchant": "THE QUORUM CLUB",
    "title": "Sunday Brunch Club: An afternoon of asian cuisine and live music",
    "tag": "26th July 2026",
    "source": "https://www.timesblack.com/benefits/events/sunday-brunch-club-ggn",
    "updatedAt": "2026-07-08T08:10:18.165+00:00"
  },
  {
    "id": "10981757-07e9-4ba8-b4dd-03ff64c95f2d",
    "section": "EVENTS",
    "merchant": "THE QUORUM CLUB",
    "title": "Sunday Shakedown: An intuitive movement experience",
    "tag": "26th July 2026",
    "source": "https://www.timesblack.com/benefits/events/sunday-shakedown-mumbai",
    "updatedAt": "2026-07-08T08:08:04.805+00:00"
  },
  {
    "id": "e8263c71-56c5-429c-80a8-bf6f5cbf5964",
    "section": "EVENTS",
    "merchant": "TIMES OF INDIA",
    "title": "Inked in History: A Guided Tour of The Times of India Printing Press in Pune",
    "tag": "Pune",
    "source": "https://www.timesblack.com/benefits/events/printing-press-pune-july",
    "updatedAt": "2026-07-08T08:10:50.742+00:00"
  },
  {
    "id": "6f5aaaf7-acaf-441a-a857-a2efd2ec0dbe",
    "section": "EXCLUSIVE DISCOUNTS",
    "merchant": "AVIS",
    "title": "Chauffeur-driven luxury cars at a 25% discount and a 35% discount on premium cars",
    "tag": null,
    "source": "https://www.timesblack.com/benefits/exclusive-discounts/avis-swipe-domestic",
    "updatedAt": "2026-03-30T10:28:54.860+00:00"
  },
  {
    "id": "fcd23317-e7fc-4d7d-affe-f6fb98c27ed8",
    "section": "EXCLUSIVE DISCOUNTS",
    "merchant": "IXIGO",
    "title": "Plan your getaways with a 15% off upto ₹1,000 on flight bookings",
    "tag": null,
    "source": "https://www.timesblack.com/benefits/exclusive-discounts/ixigo-card-swipe-flights",
    "updatedAt": "2026-03-30T10:29:35.315+00:00"
  },
  {
    "id": "c964f8f8-555e-4da0-8542-96c25f668b21",
    "section": "EXCLUSIVE DISCOUNTS",
    "merchant": "INTERFLORA",
    "title": "Exclusive 20% discount on all floral purchases and gifting needs",
    "tag": null,
    "source": "https://www.timesblack.com/benefits/exclusive-discounts/interflora-card-swipe",
    "updatedAt": "2026-03-30T10:28:23.365+00:00"
  },
  {
    "id": "9b967658-011c-491b-8500-0deee6777f1d",
    "section": "EXCLUSIVE DISCOUNTS",
    "merchant": "TUMI",
    "title": "Travel accessories & backpacks from TUMI at ₹5,000 off on an MOV of ₹50,000",
    "tag": "Valid on tumi.in",
    "source": "https://www.timesblack.com/benefits/exclusive-discounts/tumi-discount-offer",
    "updatedAt": "2026-05-14T11:02:43.068+00:00"
  },
  {
    "id": "ab90035a-d150-4a8e-adc2-225993f99ab8",
    "section": "EXCLUSIVE DISCOUNTS",
    "merchant": "IXIGO",
    "title": "Plan your stays with 15% off upto ₹2,500 on hotel bookings",
    "tag": null,
    "source": "https://www.timesblack.com/benefits/exclusive-discounts/ixigo-card-swipe-hotel",
    "updatedAt": "2026-03-30T10:29:12.734+00:00"
  },
  {
    "id": "c37fb489-c0f6-449c-8f9d-5e63a0ca0cd1",
    "section": "SIGNATURE BENEFITS",
    "merchant": "CONCIERGE SUPPORT",
    "title": "24x7 domestic & international concierge support from ICICI Bank's expert i-Assist team",
    "tag": null,
    "source": "https://www.timesblack.com/benefits/signature-benefits/concierge-support",
    "updatedAt": "2025-12-15T15:00:54.534+00:00"
  },
  {
    "id": "53f957bb-61bf-4879-a9c2-af73a198e3b3",
    "section": "SIGNATURE BENEFITS",
    "merchant": "TRAVEL INSURANCE",
    "title": "Zero cancellation charges on air travel and hotel bookings",
    "tag": null,
    "source": "https://www.timesblack.com/benefits/signature-benefits/insurance-cover",
    "updatedAt": "2025-12-15T15:01:16.251+00:00"
  },
  {
    "id": "21845596-81dd-43bc-b994-32fb26d5fd6a",
    "section": "SIGNATURE BENEFITS",
    "merchant": "FUEL SURCHARGE WAIVER",
    "title": "Maximize your savings with a 1% waiver on fuel surcharge for all transactions",
    "tag": null,
    "source": "https://www.timesblack.com/benefits/signature-benefits/fuel-surcharge",
    "updatedAt": "2025-12-15T15:01:43.780+00:00"
  }
];

