package com.project.project.services;

import com.project.project.dto.BookingsDTO;
import com.project.project.dto.UserRegisteredDTO;
import com.project.project.entity.Booking;


import com.project.project.entity.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface DefaultUserService extends UserDetailsService {
    User save(UserRegisteredDTO userRegisteredDTO);
    Booking updateBooking(BookingsDTO bookingsDTO,UserDetails user);

    UserDetails loadUserByUsername(String email);

}
