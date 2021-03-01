


const AccountScreen = () => {
    const {state, accountSave, clearErrorMessage} = useContext(AuthContext);
    const {email, password, username, dob, memberType, cohortYear} = state;

    const [email, setEmail] = useState(email);
    const [password, setPassword] = useState(password);
    const [username, setUsername] = useState(username);
    const [dob, setBirthday] = useState(dob);
    const [memberType, setMemType] = useState(memberType);
    const [cohortYear, setCoYear] = useState(cohortYear);


    return (
    <SafeAreaView forceInset={{top: 'always'}}>
        <NavigationEvents onWillFocus={clearErrorMessage} />

        <Text> Account Screen</Text>
        <Input 
            label="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            autoCorrect={false}
        />
        <Spacer />
        <Input 
            label="Password"
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry 
        />
        <Input
            label="Username"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            autoCorrect={false}
        />
        <Input
            label="Birthday"
            value={dob}
            onChangeText={setBirthday}
            autoCapitalize="none"
            autoCorrect={false}
        />
        <Input
            label="Member Type"
            value={memberType}
            onChangeText={setMemType}
            autoCapitalize="none"
            autoCorrect={false}
        />
        <Input // todo: make into different component
            label="Cohort Year"
            value={cohortYear}
            onChangeText={setCoYear}
            autoCapitalize="none"
            autoCorrect={false}
        />
        {errorMessage ? <Text style={StyleSheet.errorMessage} /* todo: handle errors appropriately under each field */> {errorMessage} </Text> : null}
        <Spacer>
            <Button title="Save changes" onPress={() => accountSave({email, password, username, dob, memberType, cohortYear})} />
        </Spacer>
    </SafeAreaView>
    );  
};

const styles = StyleSheet.create({
    container: {
        flex: 1, // fill as much vertical space as possible
        justifyContent: 'center',
        marginBottom: 150
    },
    errorMessage: {
        fontSize: 16, 
        color: 'red',
        marginLeft: 15,
        marginTop: 15
    }
});

export default AccountScreen;