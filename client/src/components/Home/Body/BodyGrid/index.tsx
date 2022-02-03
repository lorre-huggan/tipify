import React, { ReactElement } from 'react';
import './styles.scss';
import { BsEmojiHeartEyes } from 'react-icons/bs';
import { GiMagicHat } from 'react-icons/gi';
import { AiOutlineAreaChart } from 'react-icons/ai';
import { GiWorld } from 'react-icons/gi';
type Props = {};

type BodyGridProps = {
  title: string;
  description: string;
  icon: ReactElement;
};

const BodyGrid = (props: Props) => {
  return (
    <div className="home-body-grid">
      <BodyGridItem
        title="Easy to Use"
        description=" Our user experience provides easy tip entry and data viewing. Your
            information has never looked so good."
        icon={<BsEmojiHeartEyes />}
      />
      <BodyGridItem
        title="More Features"
        description="Tipify provides more features than many other tip tracking/earnings app in the marketplace. We always listen to our customers add new features."
        icon={<GiMagicHat />}
      />
      <BodyGridItem
        title="Track your earnings"
        description="Keep a record of each shift you work and the money you made. Then we calculate the total and see how much you made for each month or day."
        icon={<AiOutlineAreaChart />}
      />
      <BodyGridItem
        title="Access from Any Device"
        description="Since Tipify is cloud based you can access your information from any internet connected device."
        icon={<GiWorld />}
      />
    </div>
  );
};

export default BodyGrid;

export const BodyGridItem: React.FC<BodyGridProps> = ({
  title,
  description,
  icon,
}) => {
  return (
    <div className="home-body-grid-one">
      <div className="home-body-grid-one-left">{icon}</div>
      <div className="home-body-grid-one-right">
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </div>
  );
};
