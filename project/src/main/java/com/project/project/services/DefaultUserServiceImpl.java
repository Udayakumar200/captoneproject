package com.project.project.services;

import com.project.project.dto.BookingsDTO;
import com.project.project.dto.UserRegisteredDTO;
import com.project.project.entity.Booking;
import com.project.project.entity.Role;
import com.project.project.entity.User;
import com.project.project.repository.BookingsRepository;
import com.project.project.repository.RoleRepository;
import com.project.project.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class DefaultUserServiceImpl implements  DefaultUserService{
    @Autowired
    private UserRepository userRepo;

    @Autowired
    private BookingsRepository bookingRepository;

    @Autowired
    private RoleRepository roleRepo;

    @Override
    public User save(UserRegisteredDTO userRegisteredDTO) {
        return null;
    }

    @Override
    public Booking updateBooking(BookingsDTO bookingsDTO, UserDetails user) {
        Booking booking = new Booking();
        String email = user.getUsername();
        User users = userRepo.findByEmail(email);
        booking.setBusName(bookingsDTO.getBusName());
        booking.setFilterDate(bookingsDTO.getFilterDate());
        booking.setFromDestination(bookingsDTO.getFromDestination());
        booking.setToDestination(bookingsDTO.getToDestination());
        booking.setNoOfPersons(bookingsDTO.getNoOfPersons());
        booking.setTotalCalculated(bookingsDTO.getTotalCalculated());
        booking.setTime(bookingsDTO.getTime());
        booking.setUserId(users.getId());
        booking.setTripStatus(true);
        return bookingRepository.save(booking);
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepo.findByEmail(email);
        if(user == null) {
            throw new UsernameNotFoundException("Invalid username or password.");
        }
        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), mapRolesToAuthorities(user.getRole()));
    }

    private Collection<? extends GrantedAuthority> mapRolesToAuthorities(Set<Role> roles){
        return roles.stream().map(role -> new SimpleGrantedAuthority(role.getRole())).collect(Collectors.toList());
    }
    }

