import { useNavigate } from "react-router-dom";

export default function Intro() {
  const navigate = useNavigate();


    const handleLogin = () => {
        navigation.push(ScreenType.LOGIN);
    };

    return (
        // <Container>
        //     <Image source={require("../assets/AppStartLogo.png")} style={{width:windowWidth*0.6, height:windowWidth*0.6}} />
        //     <Text style={styles.head}>TONIC</Text>
        //     <Text style={styles.content}>Easy Buy, Easy Sell</Text>
        //     <Text style={styles.contentBottom}>SBU Market Place</Text>
        //     <StartButton onPress={handleLogin}>
        //         <StartText>Start</StartText>
        //     </StartButton>
        // </Container>
        <div>
            <img src=""></img>
            <div>
                <div>BankFeast</div>
                <div>Sharing Abundance, Nourishing Communities</div>
                <div>Turning Surplus into Support</div>
                <button onClick={() => navigate('/')}>
                    <div>Start</div>
                </button>
            </div>
        </div>
    );
}