import { useEffect, useState } from "react";
import { shuffle } from "lodash";
import Image, { StaticImageData } from "next/image";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { useRouter } from "next/router";
import classNames from "classnames";
import chad from "../../public/assets/images/musicians/crummel-chad.jpg";
import randy from "../../public/assets/images/musicians/johnson-randy.jpg";
import james from "../../public/assets/images/musicians/swarts-james.jpg";
import riley from "../../public/assets/images/musicians/barnes-riley.jpg";
import jamesCromer from "../../public/assets/images/musicians/cromer-james.jpg";
import jeffrey from "../../public/assets/images/musicians/deroche-jeffrey.jpg";
import joseph from "../../public/assets/images/musicians/gonzalez-joseph.jpg";
import matthew from "../../public/assets/images/musicians/mitchener-matthew.jpg";
import nick from "../../public/assets/images/musicians/taylor-nick.jpg";
import { makeStyles } from "@mui/styles";
import axios from "axios";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "5%",
    marginLeft: "5%",
  },
  selected: {
    boxShadow: "0 0 0 5px #37A8FA",
  },
  image: {
    width: 200,
    height: 200,
    overflow: "hidden",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
  },
  musicians: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
}));

export default function SelectPlayers() {
  interface User {
    first_name: string;
    image: string;
    last_name: string;
    user_id: number;
    branch: Branch;
    gand: Band;
  }
  interface Branch {
    branch_id: number;
    nickname_id: number;
    branch_name: string;
  }
  interface Band {
    band_id: number;
    band_name: string;
  }
  interface Musician {
    name: string;
    selected: boolean;
    img: StaticImageData;
  }
  interface Instrument {
    name: string;
    selected: boolean;
  }
  interface Assignment {
    name: string;
    instrument: string;
  }

  const classes = useStyles();
  const [instruments, setInstruments] = useState<Instrument[]>([
    { name: "bass drum", selected: false },
    { name: "snare", selected: false },
    { name: "triangle", selected: false },
  ]);

  const [musicians, setMusicians] = useState<Musician[]>([
    { name: "Randy Johnson", selected: false, img: randy },
    { name: "James Swarts", selected: false, img: james },
    { name: "Riley Barnes", selected: false, img: riley },
    { name: "James Cromer", selected: false, img: jamesCromer },
    { name: "Chad Crummel", selected: false, img: chad },
    { name: "Jeffrey DeRoche", selected: false, img: jeffrey },
    { name: "Joseph Gonzalez", selected: false, img: joseph },
    { name: "Nicholas Taylor", selected: false, img: nick },
    { name: "Matthew Mitchener", selected: false, img: matthew },
  ]);
  const [user, setUser] = useState<User[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://server.pickyourdrum.link/users"
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  console.log(user);
  const [assignments, setAssignments] = useState<Assignment[]>([
    { name: "Chad", instrument: "bass drum" },
  ]);

  const selectedEqual =
    instruments.filter((instrument) => instrument.selected).length ===
    musicians.filter((name) => name.selected).length;

  const handleClickMusician = (item: Musician) => {
    const nextMusician = musicians.map((musician) => {
      if (musician.name === item.name) {
        return { name: item.name, selected: !item.selected, img: item.img };
      } else {
        return musician;
      }
    });
    setMusicians(nextMusician);
  };

  const handleClickInstrument = (item: Instrument) => {
    const nextInstrument = instruments.map((instrument) => {
      if (instrument.name === item.name) {
        return { name: item.name, selected: !item.selected };
      } else {
        return instrument;
      }
    });
    setInstruments(nextInstrument);
  };

  const router = useRouter();

  const assign = (names: Musician[], instruments: Instrument[]) => {
    // const assignment: Assignment = { name: "", instrument: "" }
    const shuffledNames = shuffle(names.filter((name) => name.selected));
    const shuffledInstruments = shuffle(
      instruments.filter((instrument) => instrument.selected)
    );
    const nextAssignment = shuffledNames.map((name, i) => {
      return { name: name.name, instrument: shuffledInstruments[i].name };
    });
    setAssignments(nextAssignment);
  };

  return (
    <>
      <div>
        {user?.map((user) => (
          <Typography>
            {user.first_name} {user.last_name}
          </Typography>
        ))}
        <Box className={classNames(classes.container)}>
          <h2>Select Payers</h2>
          <div className={classNames(classes.musicians)}>
            {musicians.map((musician: Musician) => (
              <div key={musician.name} className={classNames(classes.card)}>
                <div
                  className={classNames(classes.image, {
                    [classes.selected]: musician.selected,
                  })}
                  key={musician.name}
                  onClick={() => handleClickMusician(musician)}
                >
                  <Image
                    src={musician.img}
                    alt={musician.name}
                    width={200}
                    height={280}
                  />
                </div>
                <Typography style={{ marginTop: "5%" }}>
                  {musician.name}
                </Typography>
              </div>
            ))}
          </div>
        </Box>
        <Box className={classNames(classes.container)}>
          <h2>Select Instruments</h2>
          <div>
            {instruments.map((instrument) => (
              <Card
                className={classNames(classes.image, {
                  [classes.selected]: instrument.selected,
                })}
                key={instrument.name}
                onClick={() => handleClickInstrument(instrument)}
              >
                <CardContent>
                  <Typography>{instrument.name}</Typography>
                </CardContent>
              </Card>
            ))}
          </div>
        </Box>
      </div>
      <div>
        <h2>Instruments</h2>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {instruments.map((instrument) => (
            <Card
              className={`${classes.card} ${
                instrument.selected && classes.selected
              }`}
              key={instrument.name}
              onClick={() => handleClickInstrument(instrument)}
            >
              <CardContent>
                <Typography>{instrument.name}</Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <button
        onClick={(e) => {
          e.preventDefault();
          // assign(names, instruments);
          router.push({
            pathname: "/assignments",
            query: { object: JSON.stringify(assignments) },
          });
        }}
        disabled={!selectedEqual}
      >
        Give me assignments!
      </button>
    </>
  );
}