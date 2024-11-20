import Advantages from '@/components/Advantages/Advantages';
import Answers from '@/components/Ansvers/Answers';
import Consumables from '@/components/Consumables/Consumables';
import EasyMoney from '@/components/EasyMoney/EasyMoney';
import Feedback from '@/components/Feedback/Feedback';
import Form from '@/components/Form/Form';
import Hero from '@/components/Hero/Hero';
import Instruments from '@/components/Instruments/Instruments';
import MustHave from '@/components/MustHave/MustHave';
import Program from '@/components/Program/Program';
import Start from '@/components/Start/Start';
import Study from '@/components/Study/Study';
import Working from '@/components/Working/Working';

export default function Home() {
  return (
    <>
      <Hero />
      <Instruments />
      <Working />
      <MustHave />
      <Advantages />
      <Consumables />
      <Start />
      <EasyMoney />
      <Study />
      <Program />
      <Feedback />
      <Answers />
      <Form />
    </>
  );
}