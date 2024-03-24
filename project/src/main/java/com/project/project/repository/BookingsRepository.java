package com.project.project.repository;

import com.project.project.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingsRepository extends JpaRepository<Booking,Integer>{
    List<Booking>findByUserId(int userId);

}
