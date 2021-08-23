import React, {useContext, useEffect} from 'react';
import {Text, View, StyleSheet, FlatList, Image, TouchableOpacity} from 'react-native';
import {Context as AuthContext} from '../context/AuthContext';
import UserAvatar from '../components/UserAvatar';

const ContactsScreen = ({nav}) => {
    const {state, getUsers} = useContext(AuthContext);
    const {users} = state;
    var isLoading = false;
    var contactLetterHeader = null;

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try{
            await getUsers({});
        }
        catch(err){
            // todo_log statement
        }
    }

    const constructContact = (user) => {
        var firstLetter = user.item.firstname.charAt(0);
        var showLetter = false;

        if(contactLetterHeader != firstLetter)
        {
            contactLetterHeader = firstLetter;
            showLetter = true;
        }

        return (
            <>
                {showLetter ?
                    <Text style={styles.contactLetter}> {contactLetterHeader} </Text> : null
                }
                <View style={styles.contactContainer}>
                    <TouchableOpacity onPress={() => nav.navigate('ContactDetail', {'user' : user.item})}>
                        <View style={styles.innerContainer}>
                            {user.item.image_url ?
                                <UserAvatar containerStyle={styles.contactAvatar} sourceimage={user.item.image_url} />
                                :
                                <UserAvatar containerStyle={styles.contactAvatar} size={40} title={user.item.firstname.charAt(0)} />
                            }
                            <Text style={styles.contactText}> {user.item.firstname} {user.item.lastname} </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.contactArrow} onPress={() => nav.navigate('ContactDetail', {'user' : user.item})}>
                        <Image source={require('../img/angle_right.png')} />
                    </TouchableOpacity>
                </View>
            </>
        );
    };

    return (
        <View>
            <FlatList
                data={users}
                renderItem={(item) => constructContact(item)}
                keyExtractor={(item) => item._id}
                refreshing={isLoading}
                onRefresh={fetchUsers}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    contactContainer: {
        padding: 10,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 10,
        marginBottom: 5,
        justifyContent: 'space-between',

    },
    innerContainer: {
        flexDirection: 'row'
    },
    contactAvatar: {
        marginLeft: 2,
        marginRight: 15
    },
    contactText: {
       alignSelf: 'center',
       fontSize: 16,
       color: 'gray',
    },
    contactArrow: {
        alignSelf: 'center',
    },
    contactLetter: {
        marginTop: 10,
        marginBottom: 10,
        color: 'gray',
    }
})

export default ContactsScreen;