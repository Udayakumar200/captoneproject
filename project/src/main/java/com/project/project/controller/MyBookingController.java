package com.project.project.controller;

import com.project.project.dto.BookingsDTO;
import com.project.project.entity.Booking;
import com.project.project.entity.User;
import com.project.project.mapper.ObjectCreationHelper;
import com.project.project.repository.BookingsRepository;
import com.project.project.repository.UserRepository;
import com.project.project.services.DefaultUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@CrossOrigin( "*")

@Controller
@RequestMapping("/booking")
public class MyBookingController {

    private DefaultUserService userService;

    public MyBookingController(DefaultUserService userService) {
        super();
        this.userService = userService;
    }

    @Autowired
    BookingsRepository bookingsRepository;

    @Autowired
    UserRepository userRepository;

    @ModelAttribute("bookings")
    public BookingsDTO bookingDto() {
        return new BookingsDTO();
    }

    @GetMapping
    public String login(Model model) {
        SecurityContext securityContext = SecurityContextHolder.getContext();
        UserDetails users = (UserDetails) securityContext.getAuthentication().getPrincipal();
        User user = userRepository.findByEmail(users.getUsername());
        List<BookingsDTO> bks = new ArrayList<BookingsDTO>();
        List<Booking> bs = bookingsRepository.findByUserId(user.getId());
        for (Booking bookings : bs) {
            BookingsDTO bkks = ObjectCreationHelper.createBookingsDTO(bookings);
            bks.add(bkks);
        }
        model.addAttribute("userDetails", user.getName());
        Collections.reverse(bks);
        model.addAttribute("bookings", bks);
        return "myBookings";
    }

    @GetMapping("/generate/{id}")
    public String bookPage(@PathVariable int id, Model model) {
        Optional<Booking> busdata = bookingsRepository.findById(id);
        Optional<User> users = userRepository.findById(busdata.get().getUserId());
        String user = users.get().getName();
        BookingsDTO bks = ObjectCreationHelper.createBookingsDTO(busdata.get());
        model.addAttribute("userDetails", user);
        List<Booking> bs = bookingsRepository.findByUserId(users.get().getId());
        Collections.reverse(bs);
        model.addAttribute("bookings", bs);
        return "redirect:/myBooking?success";
    }
    @GetMapping("/cancel/{id}")
    public String cancelBooking(@PathVariable int id,Model model) {
        Optional<Booking> busdata = bookingsRepository.findById(id);
        if (busdata.get().isTripStatus() == false) {
            setData(busdata.get(), model);
            return "redirect:/myBooking?alreadyCancel";
        } else {
            setData(busdata.get(), model);
            busdata.get().setTripStatus(false);
            bookingsRepository.save(busdata.get());

            return "redirect:/myBooking?successCancel";

        }
    }
            private void setData (Booking busData, Model model){
            Optional<User> users = userRepository.findById(busData.getUserId());
            List<Booking> bs = bookingsRepository.findByUserId(users.get().getId());
            Collections.reverse(bs);
            model.addAttribute("bookings", bs);

        }
    }

